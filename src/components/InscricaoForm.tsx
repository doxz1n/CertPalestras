"use client";

import { buscaCpf } from "../../lib/actions";
import { useState } from "react";
import axios from "axios";

interface InscricaoFormProps {
  eventoId: string;
}

const InscricaoForm = ({ eventoId }: InscricaoFormProps) => {
  const [cpf, setCpf] = useState("");
  const [existeCpf, setExisteCpf] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const verificarCpf = async () => {
    try {
      const existe = await buscaCpf(cpf);
      setExisteCpf(existe); // true se o CPF já estiver no sistema
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
    }
  };

  const handleInscricao = async () => {
    try {
      if (existeCpf) {
        // Usuário já existe, apenas inscrevê-lo no evento
        await axios.post("/api/inscrever", { cpf, eventoId });
        setMensagem("Inscrição realizada com sucesso!");
      } else {
        // Cadastrar novo usuário e inscrevê-lo
        await axios.post("/api/cadastrar-inscrever", {
          cpf,
          nome,
          email,
          eventoId,
        });
        setMensagem("Usuário cadastrado e inscrição realizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao inscrever:", error);
      setMensagem("Erro ao realizar a inscrição.");
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Inscrição</h2>
        <div className="space-y-4">
          <label htmlFor="cpf" className="block text-sm font-medium">
            CPF:
          </label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onBlur={verificarCpf}
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
          />
        </div>

        {existeCpf ? (
          <button
            onClick={handleInscricao}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Confirmar Inscrição
          </button>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
              />
            </div>
            <button
              onClick={handleInscricao}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Cadastrar e Inscrever
            </button>
          </form>
        )}

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
};

export default InscricaoForm;
