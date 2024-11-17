"use client";

import React, { useEffect, useState } from "react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
interface PageProps {
  params: {
    id: string;
  };
}

const Home = ({ params }: PageProps) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Adiciona estado para gerenciar erros

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch("/api/event/gerar-qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventoId: params.id }),
        });

        const data = await response.json();

        if (response.ok) {
          setQrCode(data.qrCode);
          setError(null); // Limpa erros anteriores
        } else {
          setError(data.error); // Define o erro no estado
        }
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        setError(`Ocorreu um erro ao gerar o QR Code. ${error}`); // Mensagem de erro genérica
      }
    };

    fetchQRCode();
  }, [params.id]); // Adiciona params.id como dependência

  return (
    <div style={{ textAlign: "center" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {qrCode && <QRCodeDisplay qrCode={qrCode} />}
    </div>
  );
};

export default Home;
