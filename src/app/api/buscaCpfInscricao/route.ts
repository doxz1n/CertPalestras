import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cpf = searchParams.get("cpf");
  const eventoId = searchParams.get("eventoId");

  if (!cpf || !eventoId) {
    return NextResponse.json(
      { error: "CPF e Evento ID são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    // Verificar se o aluno existe
    const alunoRef = doc(db, "alunos", cpf);
    const alunoDoc = await getDoc(alunoRef);

    if (!alunoDoc.exists()) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }

    const alunoData = alunoDoc.data();
    const { nome, email } = alunoData;

    // Verificar inscrição no evento
    const eventoRef = doc(db, "eventos", eventoId);
    const eventoDoc = await getDoc(eventoRef);

    if (!eventoDoc.exists()) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    const eventoData = eventoDoc.data();
    const inscritos = eventoData.inscritos || [];

    const isInscrito = inscritos.some(
      (inscrito: { cpf: string }) => inscrito.cpf === cpf
    );

    return NextResponse.json(
      { exists: true, nome, email, inscrito: isInscrito },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar CPF e inscrição:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
