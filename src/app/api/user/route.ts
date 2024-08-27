import { db } from "@/../lib/firebase";
import { CreateAuth } from "@/utils/Auth";
import userSchema, { Usuario } from "@/utils/userSchema";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação dos dados recebidos com Yup
    const validatedUserData: Usuario = await userSchema.validate(body, {
      abortEarly: false,
    });

    //Caso o tipo for coordenador
    if (validatedUserData.tipo === "coordenador") {
      //Criação do coordenador no Firebase Auth usando email e senha
      const uid = await CreateAuth(validatedUserData.email, body.senha);

      await addDoc(collection(db, "coordenadores"), {
        uid,
        email: validatedUserData.email,
        nome: validatedUserData.nome,
        eventosInscritos: validatedUserData.eventosInscritos,
        certificados: validatedUserData.certificados,
      });

      return NextResponse.json(
        { message: "Coordenador criado com sucesso!" },
        { status: 200 }
      );
    }
    //Fim do bloco
    //Caso o tipo for aluno
    else if (validatedUserData.tipo === "aluno") {
      await addDoc(collection(db, "alunos"), {
        email: validatedUserData.email,
        nome: validatedUserData.nome,
        eventosInscritos: validatedUserData.eventosInscritos,
        certificados: validatedUserData.certificados,
      });

      return NextResponse.json(
        { message: "Aluno criado com sucesso!" },
        { status: 200 }
      );
    }
    //Fim do bloco
    //Tipo de usuário não atende aos requisitos
    else {
      return NextResponse.json(
        { error: "Tipo de usuário inválido" },
        { status: 400 }
      );
    }
    //Fim do Bloco
  } catch (error) {
    //Verifica erros de servidor
    // Verifica se o erro é uma instância de Yup.ValidationError, que ocorre se a validação dos dados falhar.
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } 
    else {
      // Se o erro não for de validação, ele é registrado no console para depuração.
      console.error("Erro ao criar usuário:", error);
      return NextResponse.json(
        { error: "Erro interno do servidor" },
        { status: 500 }
      );
    }
  }
}
