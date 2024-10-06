import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave";

export async function POST(request: Request) {
  const { cpf, token } = await request.json();
  if (!token) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 400 });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, JWT_SECRET) as { eventoId: string };
    const { eventoId } = decoded;

    const eventoRef = doc(db, "eventos", eventoId);
    const alunoRef = doc(db, "alunos", cpf);
    const alunoSnap = await getDoc(alunoRef);

    if (!alunoSnap.exists()) {
      return NextResponse.json(
        { error: "Aluno não encontrado" },
        { status: 404 }
      );
    }

    const alunoData = alunoSnap.data();
    const eventosInscritos = Array.isArray(alunoData.eventosInscritos)
      ? alunoData.eventosInscritos
      : [];

    // Verificar se o aluno está inscrito no evento
    const eventoInscrito = eventosInscritos.find(
      (evento) => evento.eventoId === eventoId
    );

    if (!eventoInscrito) {
      return NextResponse.json(
        { error: "Aluno não está inscrito no evento" },
        { status: 403 }
      );
    }

    if (eventoInscrito.presencaValidada) {
      return NextResponse.json(
        { error: "Presença já validada" },
        { status: 400 }
      );
    }

    // Atualizar a presença do aluno no Firestore
    const updatedEventos = eventosInscritos.map((evento) =>
      evento.eventoId === eventoId
        ? { ...evento, presencaValidada: true }
        : evento
    );

    await updateDoc(alunoRef, {
      eventosInscritos: updatedEventos,
    });

    // Atualizar o evento para registrar que o aluno está presente
    const eventoSnap = await getDoc(eventoRef);

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

    // Verifica se o aluno já está na lista de inscritos
    const alunoInscrito = inscritos.find((inscrito) => inscrito.cpf === cpf);

    if (alunoInscrito) {
      // Se o aluno já estiver na lista de inscritos, atualize a presença
      await updateDoc(eventoRef, {
        inscritos: inscritos.map((inscrito) =>
          inscrito.cpf === cpf
            ? { ...inscrito, presencaValidada: true }
            : inscrito
        ),
      });
    } else {
      // Caso contrário, adicione o aluno à lista de inscritos
      await updateDoc(eventoRef, {
        inscritos: [...inscritos, { presencaValidada: true }],
      });
    }

    return NextResponse.json(
      { success: "Presença validada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "Token expirado" }, { status: 400 });
    }
    return NextResponse.json({ error: "Token inválido" }, { status: 400 });
  }
}
