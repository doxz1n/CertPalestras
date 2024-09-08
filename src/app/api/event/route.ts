import { db } from "../../../../lib/firebase";
import eventoSchema, { Evento } from "@/utils/eventoSchema";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    //Validação YUP
    const validateData: Evento = await eventoSchema.validate(body, {
      abortEarly: false,
    });
    //Criar evento
    await addDoc(collection(db, "eventos"), {
      nome: validateData.nome,
      dataInicio: validateData.dataInicio,
      dataFim: validateData.dataFim,
      descricao: validateData.descricao,
      vagas: validateData.vagas,
    });

    return NextResponse.json(
      { message: "Evento criado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    // Verifica se o erro é uma instância de Yup.ValidationError, que ocorre se a validação dos dados falhar.
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
