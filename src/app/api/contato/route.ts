import { db } from "@/../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

interface ContatoFormData {
  // Define o formato de um objeto
  nome: string;
  email: string;
  mensagem: string;
}

export async function POST(request: Request) {
  try {
    const { nome, email, mensagem } = (await request.json()) as ContatoFormData;

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { message: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    // Referência para a coleção de contatos
    const contatosCollection = collection(db, "contatos");

    //Adiciona Doc na coleção
    await addDoc(contatosCollection, {
      nome,
      email,
      mensagem,
      createAt: Timestamp.now(),
    });

    return NextResponse.json(
      { message: "Contato adicionado com sucesso!" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao adicionar contato." },
      { status: 500 }
    );
  }
}
export function GET() {
  return NextResponse.json(
    { message: "GET NÃO IMPLEMENTADO" },
    { status: 405 }
  );
}
