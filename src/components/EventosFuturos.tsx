"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Evento } from "@/utils/eventoSchema";
import { useRouter } from "next/navigation";
import { formataData } from "@/lib/actions";
import { format } from "path";

export default function FutureEvents() {
  const router = useRouter();
  const handleInscricao = (eventoId: any) => {
    router.push(`/inscricao/${eventoId}`);
  };

  // Estado para armazenar os eventos futuros
  const [eventos, setEventos] = useState<Evento[]>([]);
  // Estado para indicar se os eventos estão sendo carregados
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro, se houver
  const [error, setError] = useState<string | null>(null);

  /**
   * Função responsável por buscar os eventos da API, filtrar apenas
   * aqueles que ainda irão acontecer e ordená-los para exibir os mais
   * próximos de acontecer primeiro.
   */

  const fetchEventos = async () => {
    try {
      // Faz a requisição para a API para obter eventos
      const response = await fetch("/api/event");
      const data = await response.json();

      // Verifica se a resposta da API foi bem sucedida
      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar eventos");
      }

      // Acessa a lista de eventos do objeto retornado
      const eventos = data.eventos || []; // Ajuste baseado na estrutura real

      // Valida se eventos é um array
      if (!Array.isArray(eventos)) {
        throw new Error("Dados de eventos inválidos");
      }

      // Filtra eventos futuros e ordena por data de início
      const eventosFuturos = eventos
        .filter(
          (evento: Evento) => moment(evento.dataEvento).isAfter(moment()) // Verifica se a data de fim é futura
        )
        .sort(
          (a: Evento, b: Evento) =>
            moment(a.dataInicio).diff(moment(b.dataEvento)) // Ordena por data de início
        );

      // Atualiza o estado com eventos futuros
      setEventos(eventosFuturos);
    } catch (error: any) {
      // Captura e define a mensagem de erro
      setError(error.message || "Erro desconhecido");
    } finally {
      // Desativa o carregamento após a requisição
      setLoading(false);
    }
  };

  /**
   * useEffect que executa a função fetchEventos quando o componente é montado
   * e define um intervalo para atualizar os dados a cada 120 segundos.
   */
  useEffect(() => {
    fetchEventos();

    // Atualiza os eventos a cada 120 segundos
    const interval = setInterval(fetchEventos, 120000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  // Renderiza uma mensagem de carregamento enquanto os eventos estão sendo carregados
  if (loading) return <p>Carregando eventos...</p>;
  // Renderiza uma mensagem de erro se houver um erro
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mb-10">
      {eventos.length === 0 ? (
        <p className="text-gray-600">Nenhum evento futuro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            {eventos.map((evento) => (
              <li
                key={evento.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {evento.nome}
                </h3>
                <p className="text-gray-700">{evento.descricao}</p>
                <p className="mt-2">
                  <strong>Início das Inscrições:</strong>{" "}
                  {formataData(evento.dataInicio)}
                </p>
                <p>
                  <strong>Fim das Inscrições:</strong>{" "}
                  {formataData(evento.dataFim)}
                </p>
                <p>
                  <strong>Data do Evento:</strong>{" "}
                  {formataData(evento.dataEvento)}
                </p>
                <p>
                  <strong>Vagas:</strong> {evento.vagas}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => handleInscricao(evento.id)}
                  >
                    Inscreva-se
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
