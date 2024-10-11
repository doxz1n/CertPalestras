"use client";

import { Form, Formik } from "formik";
import { buscaCpfEInscricao } from "../lib/actions";
import { useState } from "react";
import { Aluno } from "@/utils/alunoSchema";
import { useRouter } from "next/navigation";

interface InscricaoFormProps {
  eventoId: string;
  onSuccess: () => void; // Adiciona a prop onSuccess para notificar o sucesso da inscrição
}

const InscricaoForm = ({ eventoId, onSuccess }: InscricaoFormProps) => {
  const [cpf, setCpf] = useState("");
  const [existeCpf, setExisteCpf] = useState(false);
  const [jaInscrito, setJaInscrito] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBlurCpf = async () => {
    setLoading(true);
    try {
      const aluno = await buscaCpfEInscricao(cpf, eventoId);
      if (aluno.exists) {
        setExisteCpf(true);
        setNome(aluno.nome ?? "");
        setEmail(aluno.email ?? "");
        setJaInscrito(aluno.inscrito ?? false);
      } else {
        setExisteCpf(false);
      }
    } catch (error) {
      console.error("Erro ao buscar CPF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInscricao = async () => {
    setLoading(true);
    if (!existeCpf && (email === "" || nome === "")) {
      setMensagem("Preencha todos os campos do formulário");
      setLoading(false);
      return;
    }

    try {
      const url = existeCpf
        ? "/api/event/inscricao"
        : "/api/event/novo-inscricao";
      const body = existeCpf
        ? { cpf, eventoId }
        : { cpf, nome, email, eventoId };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMensagem(
          existeCpf
            ? "Inscrição realizada com sucesso"
            : "Usuário cadastrado e inscrição realizada com sucesso!"
        );
        // Espera 3 segundos para exibir a mensagem antes de redirecionar
        setTimeout(() => {
          onSuccess(); // Invoca a função onSuccess para notificar o sucesso
          router.push("/");
        }, 3000); // Aumenta o tempo de espera
      } else {
        setMensagem(
          existeCpf
            ? "Erro ao realizar inscrição"
            : "Erro ao cadastrar usuário e realizar inscrição"
        );
      }
    } catch (error) {
      console.error("Erro ao inscrever:", error);
      setMensagem("Erro ao realizar a inscrição.");
    } finally {
      setLoading(false);
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
            onChange={(e) => {
              setCpf(e.target.value);
              setExisteCpf(false);
              setNome("");
              setEmail("");
              setJaInscrito(false);
              setMensagem("");
            }}
            onBlur={handleBlurCpf}
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
          />
        </div>

        {jaInscrito ? (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-900">
            <p className="text-lg font-semibold">Inscrição confirmada!</p>
            <p className="mt-2 text-sm">
              Você já está inscrito neste evento. Caso precise de mais
              informações, entre em contato com a coordenação.
            </p>
          </div>
        ) : existeCpf ? (
          <>
            <div className="mt-4 space-y-4">
              <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900">
                <h2 className="text-lg font-semibold">
                  Atenção: Você já está cadastrado no sistema!
                </h2>
                <p className="mt-2 text-sm">
                  Caso haja alguma informação incorreta, por favor, comunique a
                  coordenação.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium">Nome:</label>
                <input
                  type="text"
                  value={nome}
                  readOnly
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email:</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleInscricao();
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                disabled={loading}
              >
                {loading ? "Processando..." : "Confirmar Inscrição"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900">
              <h2 className="text-lg font-semibold">
                Atenção: Verifique seus dados antes de se cadastrar!
              </h2>
              <p className="mt-2 text-sm">
                Caso haja alguma informação incorreta, corrija antes de enviar!
              </p>
            </div>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Nome:</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                  required
                  disabled={existeCpf || loading}
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
                  required
                  disabled={existeCpf || loading}
                />
              </div>
              <button
                onClick={handleInscricao}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                disabled={loading}
              >
                {loading ? "Processando..." : "Cadastrar e Inscrever"}
              </button>
            </form>
          </>
        )}

        {mensagem && <p className="mt-4">{mensagem}</p>}
      </div>
    </div>
  );
};

export default InscricaoForm;
