"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  obterEventoPorId,
  excluirEventoPorId,
  formataData,
} from "@/lib/actions";
import { DeletarAlerta } from "@/components/Mensagem";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { formatarNomeArquivo } from "@/lib/actions";
import Voltar from "@/components/Voltar";

interface EventoPageProps {
  params: {
    id: string;
  };
}
const MySwal = withReactContent(Swal);

const EventoDetalhes = ({ params }: EventoPageProps) => {
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvento = async () => {
      setLoading(true);
      const evento = await obterEventoPorId(params.id);
      setEvento(evento);
      setLoading(false);
    };

    fetchEvento();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await excluirEventoPorId(params.id);
      router.push("/painel/consulta-eventos"); // Redireciona após exclusão
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  const handleCertificados = async () => {
    MySwal.fire({
      title: "Gerando certificados...",
      html: "Por favor, aguarde enquanto os certificados são gerados.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`/api/emission?id=${params.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${formatarNomeArquivo(evento.nome)}_certificados.zip`;
        link.click();
        window.URL.revokeObjectURL(url);

        MySwal.fire({
          icon: "success",
          title: "Certificados gerados com sucesso!",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Erro ao gerar certificados",
        text: "Houve um problema ao gerar os certificados. Tente novamente mais tarde.",
      });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Carregando evento...</p>;
  }

  if (!evento) {
    return (
      <p className="text-center text-red-500">
        Evento não encontrado: {params.id}
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <Voltar />
      <h1 className="text-2xl font-semibold mb-4">{evento.nome}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Descrição:</strong> {evento.descricao}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Início das Inscrições:</strong> {formataData(evento.dataInicio)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Fim das Inscrições:</strong> {formataData(evento.dataFim)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Data do Evento:</strong> {formataData(evento.dataEvento)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Vagas Disponíveis:</strong> {evento.vagas}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Horas de Evento:</strong> {evento.horas}
      </p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Inscritos</h2>
        <ul className="list-disc pl-6">
          {evento.inscritos && evento.inscritos.length > 0 ? (
            evento.inscritos.map((inscrito: any, index: number) => (
              <li key={index} className="text-gray-700">
                {inscrito.nome} - CPF: {inscrito.cpf} - Presença Validada:{" "}
                {inscrito.presencaValidada ? "Sim" : "Não"}
              </li>
            ))
          ) : (
            <li className="text-gray-500">Nenhum inscrito.</li>
          )}
        </ul>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push(`/painel/editar-evento/${params.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
        >
          Editar
        </button>
        <button
          className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition duration-200 outline-dashed outline-2 outline-offset-2 outline-sky-800"
          onClick={() => router.push(`/painel/qr/${params.id}`)}
        >
          Gerar QR
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => router.push(`/painel/presenca-manual/${params.id}`)}
        >
          Presença Manual
        </button>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200 outline-dashed outline-2 outline-offset-2 outline-indigo-800"
          onClick={handleCertificados}
        >
          Gerar Certificados
        </button>
        <button
          onClick={() => DeletarAlerta(handleDelete)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default EventoDetalhes;
