import { db } from "@/lib/firebase";
import eventoSchema, { Evento } from "@/utils/eventoSchema";
import {
  collection,
  updateDoc,
  getDocs,
  addDoc,
  arrayUnion,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import moment from "moment";

const eventosCollection = collection(db, "eventos"); //Coleção Eventos

export async function POST(request: Request) {
  try {
    const body = await request.json();
    //Validação YUP
    const validateData: Evento = await eventoSchema.validate(body, {
      abortEarly: false,
    });
    //Criar evento
    const dataInicioISO = moment(
      validateData.dataInicio,
      "DD/MM/YYYY HH:mm"
    ).toISOString();
    const dataFimISO = moment(
      validateData.dataFim,
      "DD/MM/YYYY HH:mm"
    ).toISOString();

    const eventoRef = await addDoc(eventosCollection, {
      ...validateData,
      dataInicio: dataInicioISO,
      dataFim: dataFimISO,
    });

    const idCoordenador = validateData.idCoordenador;

    if (!idCoordenador) {
      throw new Error("ID do coordenador não foi fornecido");
    }

    const coordRef = doc(db, "coordenadores", idCoordenador);

    await updateDoc(coordRef, {
      EventosCriados: arrayUnion(eventoRef.id),
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

export async function GET() {
  try {
    // Busca todos os documentos na coleção "eventos"
    const querySnapshot = await getDocs(eventosCollection);

    // Mapeia os dados dos documentos para um array de eventos
    const eventos = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Adiciona o ID do documento
      ...doc.data(), // Inclui os dados do documento
    }));

    // Retorna todos os eventos em formato JSON
    return NextResponse.json({ eventos }, { status: 200 });
  } catch (error) {
    // Captura e exibe o erro no console
    console.error("Erro ao buscar eventos:", error);

    // Retorna uma resposta de erro
    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const eventoAtualizado = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID do evento é obrigatório" },
        { status: 400 }
      );
    }

    const eventoRef = doc(db, "eventos", id);

    await updateDoc(eventoRef, eventoAtualizado);

    return NextResponse.json(
      { message: "Evento atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar evento" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Evento ID é necessário" },
        { status: 400 }
      );
    }

    const eventoRef = doc(db, "eventos", id);
    await deleteDoc(eventoRef);
    return NextResponse.json(
      { message: "Evento excluído com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao excluir evento" },
      { status: 500 }
    );
  }
}
