import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave";

export async function POST(request: Request) {
  const { eventoId } = await request.json();

  try {
    // Buscar o evento no Firestore para garantir que ele existe
    const eventoRef = doc(db, "eventos", eventoId);
    const eventoSnap = await getDoc(eventoRef);

    if (!eventoSnap.exists()) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    // Gerar um token JWT com tempo de expiração (10 minutos)
    const token = jwt.sign(
      { eventoId }, // O token inclui apenas o eventoId
      JWT_SECRET,
      { expiresIn: "10m" } // O token expira em 10 minutos
    );

    // Gerar o link de validação da presença
    const qrLink = `${process.env.NEXT_PUBLIC_APP_URL}/validar-presenca?token=${token}`;

    // Gerar o QR code a partir do link
    const qrCodeDataURL = await QRCode.toDataURL(qrLink);

    return NextResponse.json({ qrCode: qrCodeDataURL }, { status: 201 });
  } catch (error) {
    console.error("Erro ao gerar QR code:", error);
    return NextResponse.json(
      { error: "Erro ao gerar QR code" },
      { status: 500 }
    );
  }
}
