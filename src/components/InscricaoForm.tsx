"use client";

import { useState } from "react";
import InputMask from "react-input-mask"; // Importa o InputMask
import { buscaCpfEInscricao } from "../lib/actions";
import { useRouter } from "next/navigation";

interface InscricaoFormProps {
  eventoId: string;
  onSuccess: () => void;
}

const InscricaoForm = ({ eventoId, onSuccess }: InscricaoFormProps) => {
  const [cpf, setCpf] = useState("");
  const [cpfConfirmacao, setCpfConfirmacao] = useState("");
  const [existeCpf, setExisteCpf] = useState(false);
  const [jaInscrito, setJaInscrito] = useState(false);
  const [nome, setNome] = useState("");
  const [nomeConfirmacao, setNomeConfirmacao] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacao, setEmailConfirmacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cpfErro, setCpfErro] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBlurCpf = async () => {
    const cpfNumeros = cpf.replace(/\D/g, ""); // Remove máscara para verificar o CPF

    // Verificação se o CPF contém 11 dígitos
    if (cpfNumeros.length !== 11) {
      setCpfErro("O CPF deve conter 11 dígitos.");
      return;
    }

    setCpfErro(""); // Limpa o erro de CPF se estiver correto
    setLoading(true);
    try {
      const aluno = await buscaCpfEInscricao(cpfNumeros, eventoId);
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

  const handleInscricao = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
    const cpfNumeros = cpf.replace(/\D/g, ""); // Remove máscara para envio
    const cpfConfirmacaoNumeros = cpfConfirmacao.replace(/\D/g, "");

    setLoading(true);

    if (!existeCpf) {
      // Validação de Nome
      if (cpfNumeros !== cpfConfirmacaoNumeros) {
        setCpfErro("Os CPFs não coincidem.");
        setLoading(false);
        return;
      }

      if (nome !== nomeConfirmacao) {
        setNomeErro("Os nomes não coincidem.");
        setLoading(false);
        return;
      }

      // Validação de Email
      if (email !== emailConfirmacao) {
        setEmailErro("Os emails não coincidem.");
        setLoading(false);
        return;
      }

      // Validações para CPF e email de novos usuários
      if (email === "" || nome === "") {
        setMensagem("Preencha todos os campos do formulário.");
        setLoading(false);
        return;
      }
    }

    try {
      const url = existeCpf
        ? "/api/event/inscricao"
        : "/api/event/novo-inscricao";
      const body = existeCpf
        ? { cpf: cpfNumeros, eventoId }
        : { cpf: cpfNumeros, nome, email, eventoId };

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
            ? "Inscrição realizada com sucesso!"
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
          <InputMask
            mask="999.999.999-99"
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
          {cpfErro && <p className="text-red-500 text-sm mt-1">{cpfErro}</p>}
          <div hidden={existeCpf}>
            <label
              htmlFor="cpfConfirmacao"
              className="block text-sm font-medium"
            >
              Confirme o CPF:
            </label>
            <InputMask
              mask="999.999.999-99"
              value={cpfConfirmacao}
              onChange={(e) => setCpfConfirmacao(e.target.value)}
              placeholder="Confirme seu CPF"
              className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
              required
              disabled={loading}
            />
          </div>
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
            <form className="mt-4 space-y-4" onSubmit={handleInscricao}>
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
                <label className="block text-sm font-medium">
                  Confirme o Nome:
                </label>
                <input
                  type="text"
                  value={nomeConfirmacao}
                  onChange={(e) => setNomeConfirmacao(e.target.value)}
                  placeholder="Confirme seu nome"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                  required
                  disabled={existeCpf || loading}
                />
              </div>
              {nomeErro && (
                <p className="text-red-500 text-sm mt-1">{nomeErro}</p>
              )}
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
              <div>
                <label className="block text-sm font-medium">
                  Confirme o Email:
                </label>
                <input
                  type="email"
                  value={emailConfirmacao}
                  onChange={(e) => setEmailConfirmacao(e.target.value)}
                  placeholder="Confirme seu email"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                  required
                  disabled={existeCpf || loading}
                />
              </div>
              {emailErro && (
                <p className="text-red-500 text-sm mt-1">{emailErro}</p>
              )}
            </form>
          </>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleInscricao(e);
          }}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md disabled:opacity-50"
          disabled={loading}
          hidden={jaInscrito}
        >
          {loading ? "Processando..." : "Inscrever"}
        </button>
        {mensagem && (
          <div
            className={`mt-4 p-2 border-l-4 ${
              mensagem.includes("sucesso")
                ? "bg-green-100 border-green-500 text-green-900"
                : "bg-red-100 border-red-500 text-red-900"
            }`}
          >
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

export default InscricaoForm;
