import { NextResponse } from "next/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "ID do coordenador é obrigatório" },
      { status: 400 }
    );
  }

  try {
    // Referência ao documento do evento no Firestore
    const eventosRef = collection(db, "eventos");
    const q = query(eventosRef, where("idCoordenador", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    const eventos = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Adiciona o ID do documento
      ...doc.data(), // Inclui os dados do documento
    }));

    return NextResponse.json({ eventos }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
