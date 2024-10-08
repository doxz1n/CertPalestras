import React from "react";

interface QRCodeDisplayProps {
  qrCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-lg font-semibold mb-4">
        QR Code para Verificação de Presença
      </h2>
      <img
        src={qrCode}
        alt="QR Code para Verificação de Presença"
        className="max-w-xs w-full mb-4"
      />
      <p className="text-center">
        Escaneie o QR Code para validar sua presença!
      </p>
    </div>
  );
};

export default QRCodeDisplay;
