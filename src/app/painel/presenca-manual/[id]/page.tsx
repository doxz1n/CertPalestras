"use client";
import { useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Presenca({ params }: PageProps) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const eventoId = params.id;

  // Função para submeter a presença
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf || !nome || !email || !eventoId) {
      setStatusMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/event/presenca-manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, nome, email, eventoId }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Presença registrada com sucesso!");
      } else {
        setStatusMessage(data.error || "Erro ao registrar presença.");
      }
    } catch (error) {
      setStatusMessage("Ocorreu um erro ao registrar a presença.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Inserir Presença
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Utilize o formulário abaixo para inserir manualmente a presença de um
          aluno em um evento.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-gray-700 font-medium mb-2"
            >
              CPF do Aluno:
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o CPF do aluno"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-700 font-medium mb-2"
            >
              Nome do Aluno:
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do aluno"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email do Aluno:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o email do aluno"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Inserir Presença"}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-lg font-semibold text-red-600">
            {statusMessage}
          </p>
        )}
      </div>
    </main>
  );
}