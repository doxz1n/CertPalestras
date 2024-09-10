"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Evento } from "@/utils/eventoSchema";

export default function FutureEvents() {
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
        .filter((evento: Evento) =>
          moment(evento.dataFim).isAfter(moment()) // Verifica se a data de fim é futura
        )
        .sort((a: Evento, b: Evento) =>
          moment(a.dataFim).diff(moment(b.dataFim)) // Ordena por data de início
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Próximos Eventos</h2>
      {eventos.length === 0 ? (
        <p>Nenhum evento futuro encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {eventos.map((evento) => (
            <li key={evento.id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{evento.nome}</h3>
              <p>{evento.descricao}</p>
              <p>
                <strong>Início:</strong> {moment(evento.dataInicio).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>
                <strong>Fim:</strong> {moment(evento.dataFim).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>
                <strong>Vagas:</strong> {evento.vagas}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
