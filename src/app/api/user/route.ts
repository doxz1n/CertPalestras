import { db } from "@/lib/firebase";
import userSchema, { Usuario } from "@/utils/userSchema";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import * as Yup from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validação dos dados recebidos com Yup
    const validatedUserData: Usuario = await userSchema.validate(body, {
      abortEarly: false,
    });
    // Criação de um novo usuário no Firebase Authentication
    if (validatedUserData.tipo === "coordenador") {
      const auth = getAuth();

      //Criação do coordenador no Firebase Auth usando email e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        validatedUserData.email,
        body.senha
      );

      const uid = userCredential.user.uid;

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
    } else if (validatedUserData.tipo === "aluno") {
      //Adiciona Aluno ao firestore
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
    } else {
      return NextResponse.json(
        { error: "Tipo de usuário inválido" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Verifica se o erro é uma instância de Yup.ValidationError, que ocorre se a validação dos dados falhar.
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    // Se o erro não for de validação, ele é registrado no console para depuração.
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
