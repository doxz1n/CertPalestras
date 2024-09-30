"use client";

import { Form, Formik } from "formik";
import { buscaCpf, verificaInscricao } from "../lib/actions";
import { useState } from "react";
import { Aluno, alunoSchema } from "@/utils/alunoSchema";
import { useRouter } from "next/navigation";

interface InscricaoFormProps {
  eventoId: string;
}

const InscricaoForm = ({ eventoId }: InscricaoFormProps) => {
  const [cpf, setCpf] = useState("");
  const [existeCpf, setExisteCpf] = useState(false);
  const [jaInscrito, setJaInscrito] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: Aluno = {
    nome: "",
    cpf: "",
    email: "",
  };

  const handleBlurCpf = async () => {
    setLoading(true);
    try {
      const cpfExiste = await buscaCpf(cpf);
      setExisteCpf(cpfExiste);

      if (cpfExiste) {
        const inscrito = await verificaInscricao(cpf, eventoId);
        setJaInscrito(inscrito);
        setMensagem(
          inscrito
            ? "Você já está inscrito neste evento."
            : "CPF já cadastrado, confirme a inscrição."
        );
      } else {
        setMensagem("CPF não cadastrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CPF:", error);
      setMensagem("Erro ao verificar o CPF.");
    } finally {
      setLoading(false);
    }
  };

  const handleInscricao = async () => {
    setLoading(true);
    // Se o CPF já existe, não faz a validação de nome e email
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
        ? { cpf, eventoId } // Apenas CPF e eventoId se já estiver cadastrado
        : { cpf, nome, email, eventoId }; // Nome e email somente se for novo cadastro

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
        setTimeout(() => {
          router.push("/"); // Redirecionando para a página inicial
        }, 1000);
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
            onChange={(e) => setCpf(e.target.value)}
            onBlur={handleBlurCpf}
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
          />
        </div>

        {existeCpf ? (
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
        )}

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
};

export default InscricaoForm;
