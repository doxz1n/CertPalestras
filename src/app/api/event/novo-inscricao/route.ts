import { db } from "@/lib/firebase";
import {
  doc,
  increment,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { cpf, nome, email, eventoId } = await request.json();
    const userRef = doc(db, "alunos", cpf);
    await setDoc(userRef, {
      nome,
      email,
      eventosInscritos: [
        {
          eventoId,
          presencaValidada: false,
        },
      ],
    });

    const eventoRef = doc(db, "eventos", eventoId);
    await updateDoc(eventoRef, {
      vagas: increment(-1),
      inscritos: arrayUnion({
        nome,
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
