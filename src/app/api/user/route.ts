import { db } from "@/../lib/firebase";
import { CreateAuth } from "@/utils/Auth";
import alunoSchema from "@/utils/alunoSchema";
import {Aluno} from "@/utils/userSchema";
import coordinatorSchema from "@/utils/coordinatorSchema";
import {Coordenador} from "@/utils/userSchema";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação dos dados recebidos com Yup
    const validatealunoData: Aluno = await alunoSchema.validate(body, {
      abortEarly: false,
    });
    const validatecoordenador: Coordenador = await coordinatorSchema.validate(body, {
      "abortEarly": false,
    });

    //Caso o tipo for coordenador
    if (validatecoordenador.tipo === "coordenador") {
      //Criação do coordenador no Firebase Auth usando email e senha
      const uid = await CreateAuth(validatecoordenador.email, body.senha);

      await addDoc(collection(db, "coordenadores"), {
        uid,
        email: validatecoordenador.email,
        nome: validatecoordenador.nome,
        senha: validatecoordenador.senha,
        eventosInscritos: validatecoordenador.eventosInscritos,
        certificados: validatecoordenador.certificados,
      });

      return NextResponse.json(
        { message: "Coordenador criado com sucesso!" },
        { status: 200 }
      );
    }
    //Fim do bloco
    //Caso o tipo for aluno
    else if (validatealunoData.tipo === "aluno") {
      await addDoc(collection(db, "alunos"), {
        nome: validatealunoData.nome,
        email: validatealunoData.email,
        cpf: validatealunoData.cpf,
        eventosInscritos: validatealunoData.eventosInscritos,
        certificados: validatealunoData.certificados,
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
