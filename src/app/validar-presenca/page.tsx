"use client"; // Indica que este componente é renderizado no lado do cliente

import React, { useEffect, useState } from "react";
import CPFInputForm from "@/components/CPFInputForm"; // Certifique-se de importar seu componente de formulário corretamente

const VerificarPresenca: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Executa apenas no lado do cliente
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken);
  }, []); // Executa uma vez quando o componente é montado

  return <div>{token && <CPFInputForm token={token} />}</div>;
};

export default VerificarPresenca;
