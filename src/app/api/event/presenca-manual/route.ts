import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cpf, nome, email, eventoId } = await request.json();
    const eventoRef = doc(db, "eventos", eventoId);
    const alunoRef = doc(db, "alunos", cpf);

    const [alunoSnap, eventoSnap] = await Promise.all([
      getDoc(alunoRef),
      getDoc(eventoRef),
    ]);

    if (!eventoSnap.exists()) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    const eventoData = eventoSnap.data();
    const inscritos = Array.isArray(eventoData.inscritos)
      ? eventoData.inscritos
      : [];

    // Se o aluno não existir, cria um novo registro
    if (!alunoSnap.exists()) {
      // Cria um novo registro do aluno
      await setDoc(alunoRef, {
        nome,
        email,
        eventosInscritos: [
          {
            eventoId,
            presencaValidada: true,
          },
        ],
      });

      // Adiciona o aluno à lista de inscritos do evento
      await updateDoc(eventoRef, {
        vagas: increment(-1),
        inscritos: arrayUnion({
          nome, // Usa o nome que veio do formulário
          cpf,
          presencaValidada: true,
        }),
      });

      return NextResponse.json(
        { success: "Aluno registrado e presença validada!" },
        { status: 200 }
      );
    }

    const alunoData = alunoSnap.data();
    const eventosInscritos = Array.isArray(alunoData.eventosInscritos)
      ? alunoData.eventosInscritos
      : [];

    // Verifica se o aluno já está inscrito no evento
    const eventoInscrito = eventosInscritos.find(
      (evento) => evento.eventoId === eventoId
    );

    if (eventoInscrito?.presencaValidada) {
      return NextResponse.json(
        { error: "Presença já validada" },
        { status: 400 }
      );
    }

    // Adiciona ou atualiza a inscrição do aluno
    if (!eventoInscrito) {
      // Atualiza os dados do aluno
      await updateDoc(alunoRef, {
        nome: nome,
        email: email,
        eventosInscritos: arrayUnion({
          eventoId,
          presencaValidada: true,
        }),
      });

      await updateDoc(eventoRef, {
        vagas: increment(-1),
        inscritos: arrayUnion({
          nome, // Usa o nome que veio do formulário
          cpf,
          presencaValidada: true,
        }),
      });
    } else {
      // Atualiza a presença validada no evento inscrito
      const updatedEventos = eventosInscritos.map((evento) =>
        evento.eventoId === eventoId
          ? { ...evento, presencaValidada: true }
          : evento
      );
      await updateDoc(alunoRef, {
        eventosInscritos: updatedEventos,
      });
    }

    // Verifica se o aluno já está na lista de inscritos do evento
    const alunoInscrito = inscritos.find((inscrito) => inscrito.cpf === cpf);

    if (alunoInscrito) {
      // Atualiza a presença do aluno no evento
      await updateDoc(eventoRef, {
        inscritos: inscritos.map((inscrito) =>
          inscrito.cpf === cpf
            ? { ...inscrito, presencaValidada: true }
            : inscrito
        ),
      });
    } else {
      // Adiciona o aluno à lista de inscritos se não estiver presente
      await updateDoc(eventoRef, {
        inscritos: arrayUnion({
          nome, // Usa o nome que veio do formulário
          cpf,
          presencaValidada: true,
        }),
      });
    }

    return NextResponse.json(
      { success: "Presença validada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
