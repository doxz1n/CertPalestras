import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
NextResponse;
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
