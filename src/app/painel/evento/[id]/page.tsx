"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obterEventoPorId, excluirEventoPorId } from "@/lib/actions";
import moment from "moment";

interface EventoPageProps {
  params: {
    id: string;
  };
}

const dateFormat = "DD/MM/YYYY HH:mm";

const EventoDetalhes = ({ params }: EventoPageProps) => {
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // estado para confirmar exclusão
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

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmOpen(false);
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
      <h1 className="text-2xl font-semibold mb-4">{evento.nome}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Descrição:</strong> {evento.descricao}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Data de Início:</strong>{" "}
        {moment(evento.dataInicio).format(dateFormat)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Data de Fim:</strong>{" "}
        {moment(evento.dataFim).format(dateFormat)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Vagas Disponíveis:</strong> {evento.vagas}
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

      {/* Botões de Editar e Excluir */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push(`/painel/editar-evento/${params.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Editar
        </button>
        <button
          onClick={openDeleteConfirmation}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Excluir
        </button>
      </div>

      {/* Modal de confirmação de exclusão */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Tem certeza que deseja excluir este evento?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Confirmar
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoDetalhes;