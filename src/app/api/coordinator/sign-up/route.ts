import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { nome, email, cpf, senha } = await request.json();
    //Criação do coordenador no Firebase Auth usando email e senha
    const usercredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = usercredential.user.uid;

    await setDoc(doc(db, "coordenadores", uid), {
      cpf,
      email,
      nome,
      senha,
    });

    return NextResponse.json(
      { message: "Coordenador criado com sucesso!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
