import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "ID do evento é obrigatório" },
      { status: 400 }
    );
  }

  try {
    // Referência ao documento do evento no Firestore
    const eventoRef = doc(db, "eventos", id);
    const eventoDoc = await getDoc(eventoRef);

    if (eventoDoc.exists()) {
      const eventoData = eventoDoc.data();
      const evento = {
        id: eventoDoc.id,
        vagas: eventoData?.vagas,
        dataInicio: eventoData?.dataInicio,
        dataFim: eventoData?.dataFim,
        nome: eventoData?.nome,
        descricao: eventoData?.descricao,
        inscritos: eventoData?.inscritos ?? [],
      };

      return NextResponse.json({ evento }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
