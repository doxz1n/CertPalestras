"use client";

import { useEffect, useState } from "react";
import InscricaoForm from "@/components/InscricaoForm";
import { formataData, obterEventoPorId } from "@/lib/actions";
import moment from "moment";

interface EventoPageProps {
  params: {
    id: string;
  };
}

const EventoPage = ({ params }: EventoPageProps) => {
  const [evento, setEvento] = useState<any>(null);
  const [rebuildCounter, setRebuildCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [encerrado, setEncerrado] = useState(false);
  const [naoComecou, setNaoComecou] = useState(false);

  const handleSuccess = () => {
    setRebuildCounter((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchEvento = async () => {
      setLoading(true);
      const evento = await obterEventoPorId(params.id);
      if (evento) {
        setEncerrado(moment().isAfter(evento.dataFim));
        setNaoComecou(moment().isBefore(evento.dataInicio));
      }
      setEvento(evento);
      setLoading(false);
    };

    fetchEvento();
  }, [params.id, rebuildCounter]);

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

  const disponivel = evento.vagas > 0;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
        {evento.nome}
      </h1>
      <p className="text-gray-800 text-center mb-6">{evento.descricao}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600">
          Período de Inscrição: {formataData(evento.dataInicio)} -{" "}
          {formataData(evento.dataFim)}
        </p>
        <p className="text-gray-600">
          Data do Evento: {formataData(evento.dataEvento)}
        </p>
        <p className="text-gray-600">Vagas: {evento.vagas}</p>

        {!naoComecou ? (
          encerrado ? (
            <p className="text-red-500">As inscrições já encerraram.</p>
          ) : disponivel ? (
            <InscricaoForm eventoId={evento.id!} onSuccess={handleSuccess} />
          ) : (
            <p className="text-red-500 font-semibold text-lg text-center">
              Não há vagas disponíveis
            </p>
          )
        ) : (
          <p className="text-red-500">As inscrições ainda não começaram.</p>
        )}
      </div>
    </div>
  );
};

export default EventoPage;
