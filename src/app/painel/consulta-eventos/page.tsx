"use client";

import { useEffect, useState } from "react";
import { Evento } from "@/utils/eventoSchema";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function ConsultaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = localStorage.getItem("uid");
  const router = useRouter();

  const handleConsulta = (eventoId: any) => {
    router.push(`/painel/evento/${eventoId}`);
  };
  const fetchEventos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/event/busca-eventos?id=${uid}`, {
        cache: "no-store", // Força a busca de dados atualizados
      });
      const data = await response.json();
      if (response.ok) {
        const eventos = data.eventos || [];
        setEventos(eventos);
      } else {
        console.error("Erro ao buscar eventos:", data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchEventos();
    }
  }, [uid]);

  return (
    <main className="flex-grow container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Eventos Disponíveis
      </h1>
      {isLoading ? (
        <div className="text-blue-900 text-xl font-semibold">
          Carregando eventos...
        </div>
      ) : eventos.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold text-blue-900">
                {evento.nome}
              </h2>
              <p className="text-gray-700">
                <strong>Data:</strong>{" "}
                {moment(evento.dataInicio).format("DD/MM/YYYY HH:mm")} -{" "}
                {moment(evento.dataFim).format("DD/MM/YYYY HH:mm")}
              </p>
              <p className="text-gray-700">
                <strong>Vagas:</strong> {evento.vagas}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Descrição:</strong> {evento.descricao}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => handleConsulta(evento.id)}
              >
                Mais detalhes
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-blue-900 text-xl font-semibold">
          Nenhum evento disponível no momento.
        </div>
      )}
    </main>
  );
}
