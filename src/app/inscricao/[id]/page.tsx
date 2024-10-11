"use client";

import { useState } from "react";
import InscricaoForm from "@/components/InscricaoForm";
import { obterEventoPorId } from "../../../lib/actions";
import moment from "moment";

interface EventoPageProps {
  params: {
    id: string;
  };
}

const dateFormat = "DD/MM/YYYY HH:mm";

const EventoPage = async ({ params }: EventoPageProps) => {
  const [rebuildCounter, setRebuildCounter] = useState(0); // Estado para o rebuild

  // Função que será chamada após a inscrição
  const handleSuccess = () => {
    setRebuildCounter((prev) => prev + 1); // Atualiza o contador para forçar o rebuild
  };

  // Recarregar o evento após cada rebuild
  const evento = await obterEventoPorId(params.id);
  if (!evento) {
    return <p>Evento não encontrado {params.id}</p>;
  }

  const disponivel = evento.vagas > 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500">{evento.nome}</h1>
      <p className="text-gray-700">{evento.descricao}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600">
          Data: {moment(evento.dataInicio).format(dateFormat)} -{" "}
          {moment(evento.dataFim).format(dateFormat)}
        </p>
        <p className="text-gray-600">Vagas: {evento.vagas}</p>

        {disponivel ? (
          <InscricaoForm eventoId={evento.id!} onSuccess={handleSuccess} />
        ) : (
          <p>Não há vagas</p>
        )}
      </div>
    </div>
  );
};

export default EventoPage;
