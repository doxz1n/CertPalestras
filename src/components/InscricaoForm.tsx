"use client"; // Indica que este componente será renderizado no lado do cliente

import { Form, Formik } from "formik"; // Importa o Formik para gerenciamento de formulários
import { buscaCpf, verificaInscricao } from "../lib/actions"; // Funções assíncronas que verificam CPF e inscrição
import { useState } from "react"; // Hook para gerenciar estado
import { Aluno, alunoSchema } from "@/utils/alunoSchema"; // Schema de validação do aluno
import { useRouter } from "next/navigation"; // Hook do Next.js para navegação

// Interface que define as propriedades esperadas no componente
interface InscricaoFormProps {
  eventoId: string; // Identificador do evento ao qual o usuário irá se inscrever
}

// Componente principal
const InscricaoForm = ({ eventoId }: InscricaoFormProps) => {
  const [cpf, setCpf] = useState(""); // Estado para armazenar o CPF
  const [existeCpf, setExisteCpf] = useState(false); // Estado para indicar se o CPF já existe no sistema
  const [jaInscrito, setJaInscrito] = useState(false); // Estado para indicar se o usuário já está inscrito no evento
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
  const [email, setEmail] = useState(""); // Estado para armazenar o email do usuário
  const [mensagem, setMensagem] = useState(""); // Estado para exibir mensagens de erro ou sucesso
  const [loading, setLoading] = useState(false); // Estado para controlar se uma operação está em andamento
  const router = useRouter(); // Utilizado para redirecionar o usuário

  // Valores iniciais do formulário de inscrição
  const initialValues: Aluno = {
    nome: "",
    cpf: "",
    email: "",
  };

  // Função que é chamada quando o campo CPF perde o foco (onBlur)
  const handleBlurCpf = async () => {
    setLoading(true); // Indica que uma operação está em andamento
    try {
      // Verifica se o CPF já está cadastrado
      const cpfExiste = await buscaCpf(cpf);
      setExisteCpf(cpfExiste); // Atualiza o estado com o resultado da busca

      if (cpfExiste) {
        // Verifica se o CPF já está inscrito no evento
        const inscrito = await verificaInscricao(cpf, eventoId);
        setJaInscrito(inscrito); // Atualiza o estado se o usuário já está inscrito
        setMensagem(inscrito ? "" : "CPF já cadastrado, confirme a inscrição."); // Exibe mensagem apropriada
      } else {
        setMensagem("CPF não cadastrado."); // Exibe mensagem se o CPF não for encontrado
      }
    } catch (error) {
      console.error("Erro ao buscar CPF:", error); // Exibe erro no console
      setMensagem("Erro ao verificar o CPF."); // Exibe mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função que trata a inscrição ou o cadastro e inscrição do usuário
  const handleInscricao = async () => {
    setLoading(true); // Inicia o estado de carregamento

    // Valida se os campos de nome e email estão preenchidos caso o CPF não exista
    if (!existeCpf && (email === "" || nome === "")) {
      setMensagem("Preencha todos os campos do formulário");
      setLoading(false);
      return;
    }

    try {
      // Define a URL e o corpo da requisição com base na existência do CPF
      const url = existeCpf
        ? "/api/event/inscricao" // Se o CPF já existir, inscreve o usuário
        : "/api/event/novo-inscricao"; // Caso contrário, cadastra o usuário e o inscreve
      const body = existeCpf
        ? { cpf, eventoId } // Envia apenas CPF e eventoId se já estiver cadastrado
        : { cpf, nome, email, eventoId }; // Envia nome, CPF, email e eventoId se for um novo cadastro

      // Realiza a requisição POST para o backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Serializa os dados para enviar na requisição
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        setMensagem(
          existeCpf
            ? "Inscrição realizada com sucesso" // Mensagem de sucesso para usuários já cadastrados
            : "Usuário cadastrado e inscrição realizada com sucesso!" // Mensagem de sucesso para novos cadastros
        );
        // Redireciona o usuário para a página inicial após 1 segundo
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        // Mensagem de erro caso algo dê errado na requisição
        setMensagem(
          existeCpf
            ? "Erro ao realizar inscrição"
            : "Erro ao cadastrar usuário e realizar inscrição"
        );
      }
    } catch (error) {
      console.error("Erro ao inscrever:", error); // Exibe o erro no console
      setMensagem("Erro ao realizar a inscrição."); // Exibe mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
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
            value={cpf} // Controla o valor do campo CPF
            onChange={(e) => {
              setCpf(e.target.value); // Atualiza o estado do CPF
              setExisteCpf(false); // Reseta o estado de existência do CPF
              setJaInscrito(false); // Reseta o estado de inscrição
              setMensagem(""); // Limpa mensagens anteriores
            }}
            onBlur={handleBlurCpf} // Verifica o CPF ao perder o foco
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
          />
        </div>

        {/* Exibe mensagem caso o usuário já esteja inscrito */}
        {jaInscrito ? (
          <p className="text-red">Você já está inscrito neste evento.</p>
        ) : existeCpf ? (
          // Exibe botão de confirmação se o CPF já existe
          <button
            onClick={(e) => {
              e.preventDefault();
              handleInscricao(); // Processa a inscrição ao clicar
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            disabled={loading} // Desabilita o botão enquanto carrega
          >
            {loading ? "Processando..." : "Confirmar Inscrição"}
          </button>
        ) : (
          // Exibe formulário de nome e email se o CPF não existir
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome:</label>
              <input
                type="text"
                value={nome} // Controla o valor do campo nome
                onChange={(e) => setNome(e.target.value)} // Atualiza o nome
                placeholder="Digite seu nome"
                className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                required
                disabled={existeCpf || loading} // Desabilita o campo se o CPF já estiver cadastrado
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                value={email} // Controla o valor do campo email
                onChange={(e) => setEmail(e.target.value)} // Atualiza o email
                placeholder="Digite seu email"
                className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                required
                disabled={existeCpf || loading} // Desabilita o campo se o CPF já estiver cadastrado
              />
            </div>
            <button
              onClick={handleInscricao} // Chama a função de inscrição ao clicar
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              disabled={loading} // Desabilita o botão durante o carregamento
            >
              {loading ? "Processando..." : "Cadastrar e Inscrever"}
            </button>
          </form>
        )}

        {/* Exibe a mensagem de erro ou sucesso */}
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
};

export default InscricaoForm;
