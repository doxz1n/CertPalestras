import { db } from "@/lib/firebase";
import {
  arrayUnion,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cpf, eventoId } = await request.json();
    const userRef = doc(db, "alunos", cpf);
    await updateDoc(userRef, {
      eventosInscritos: arrayUnion({
        eventoId,
        presencaValidada: false,
      }),
    });

    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    if (!userData || !userData.nome) {
      return NextResponse.json(
        { message: "Dados do usuário incompletos" },
        { status: 400 }
      );
    }

    const nomeUser: string = userData.nome;

    const eventoRef = doc(db, "eventos", eventoId);

    await updateDoc(eventoRef, {
      vagas: increment(-1),
      inscritos: arrayUnion({
        nome: nomeUser,
        cpf,
      }),
    });

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao realizar inscrição evento:", error);
    return NextResponse.json({ message: "Erro de servidor" }, { status: 500 });
  }
}
