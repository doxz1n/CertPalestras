// pages/api/inscrever.ts
import { db } from "@/../lib/firebase"; // Importa a instância do Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { EventoInscrito } from "@/utils/userSchema";
export async function POST(req: Request) {
  const { cpf, eventoId } = await req.json(); // Obtém os dados do corpo da requisição

  if (!cpf || !eventoId) {
    return NextResponse.json(
      { error: "CPF e ID do evento são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    // Verifica se o usuário já está inscrito
    const userRef = doc(db, "alunos", cpf);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const userData = userSnapshot.data();
    const eventosInscritos = userData?.eventosInscritos || [];

    // Verifica se o usuário já está inscrito no evento
    const alreadyInscribed = eventosInscritos.some(
      (evento: EventoInscrito) => evento.eventoId === eventoId
    );

    if (alreadyInscribed) {
      return NextResponse.json(
        { error: "Usuário já inscrito neste evento" },
        { status: 409 }
      );
    }

    // Obtém os dados do evento para verificar as vagas
    const eventoRef = doc(db, "eventos", eventoId);
    const eventoSnapshot = await getDoc(eventoRef);

    if (!eventoSnapshot.exists()) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    const eventoData = eventoSnapshot.data();
    const vagas = eventoData?.vagas;

    // Verifica se há vagas disponíveis
    if (vagas <= 0) {
      return NextResponse.json(
        { error: "Não há vagas disponíveis para este evento" },
        { status: 403 }
      );
    }

    // Inscreve o usuário no evento
    eventosInscritos.push({
      eventoId,
      dataInscricao: new Date().toISOString(), // Adiciona a data da inscrição
    });

    // Atualiza o documento do usuário no Firestore
    await setDoc(userRef, { eventosInscritos }, { merge: true });

    // Diminui o número de vagas disponíveis
    await setDoc(eventoRef, { vagas: vagas - 1 }, { merge: true });

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao inscrever usuário:", error);
    return NextResponse.json(
      { error: "Erro ao inscrever o usuário" },
      { status: 500 }
    );
  }
}
