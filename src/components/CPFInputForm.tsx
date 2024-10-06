"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o useRouter para redirecionamento

const CPFInputForm: React.FC<{ token: string }> = ({ token }) => {
  const [cpf, setCpf] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const router = useRouter(); // Instancia o hook useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/event/validar-presenca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, token }),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem(data.success);
      } else {
        setMensagem(data.error);
      }

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push("/"); // Redireciona para a página inicial
      }, 2000);
    } catch (error) {
      console.error("Erro ao validar presença:", error);
      setMensagem("Ocorreu um erro ao validar a presença.");
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Validar Presença
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Validar Presença
          </button>
        </form>
        {mensagem && (
          <p className="mt-4 text-center">{mensagem}</p> // Exibe a mensagem
        )}
      </div>
    </div>
  );
};

export default CPFInputForm;
