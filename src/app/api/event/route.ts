import { db } from "../../../../lib/firebase";
import eventoSchema, { Evento } from "@/utils/eventoSchema";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import moment from "moment";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    //Validação YUP
    const validateData: Evento = await eventoSchema.validate(body, {
      abortEarly: false,
    });
    //Criar evento

    const dataInicioISO = moment(validateData.dataInicio, "DD/MM/YYYY HH:mm").toISOString();
    const dataFimISO = moment(validateData.dataFim, "DD/MM/YYYY HH:mm").toISOString();

    await addDoc(collection(db, "eventos"), {
      ...validateData,
      dataInicio: dataInicioISO,
      dataFim: dataFimISO,
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
    const eventosRef = collection(db, "eventos");
    const hoje = new Date;
    const q = query(eventosRef, where("dataFim", ">", hoje.toISOString()));

    const querySnapshot = await getDocs(q);

    const eventosFuturos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ eventos: eventosFuturos }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar eventos futuros:", error);
    return NextResponse.json(
      { error: "Erro ao buscar eventos futuros" },
      { status: 500 }
    );
  }
}
