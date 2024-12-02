import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  statusCode: number,
  responseMessage: string
) {
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
    });

    return NextResponse.json(
      { message: "Coordenador criado com sucesso!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);

    let errorMessage = "Erro desconhecido ao criar o usuario.";
    if (error instanceof Error) {
      //tratamento padrao
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (error?.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este email ja esta sendo utilizado";
          break;
        case "auth/internal-error":
          errorMessage = "Erro no Servidor";
          break;
      }
    }
    return NextResponse.json(
      { error: responseMessage },
      { status: statusCode }
    );
  }
}
