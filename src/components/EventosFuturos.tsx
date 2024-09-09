"use client";
import { use, useEffect, useState } from "react";
import eventoSchema, { Evento } from "@/utils/eventoSchema";

export default function EventosFuturos() {
  const [eventosFuturos, setEventosFuturos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Busca eventos na API

  const fetchEventosFuturos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/event");

      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }

      const data = await response.json();
      setEventosFuturos(data.eventos);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // useEffect para chamar a API ao carregar o componente e a cada 120 segundos
  useEffect(() => {
    fetchEventosFuturos(); // primeira renderização

    const interval = setInterval(() => {
      fetchEventosFuturos(); // a cada 120 segundos
    }, 120000); // 120000 milissegundos = 120 segundos

    // Cleanup do intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  // Renderização condicional
  if (loading) {
    return <div>Carregando eventos...</div>;
  }
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Próximos Eventos</h2>
      <ul>
        {eventosFuturos.length > 0 ? (
          eventosFuturos.map((evento) => (
            <li key={evento.id} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-xl font-bold">{evento.nome}</h3>
              <p>{evento.descricao}</p>
              <p>
                <strong>Início:</strong>{" "}
                {new Date(evento.dataInicio).toLocaleString()}
              </p>
              <p>
                <strong>Fim:</strong>{" "}
                {new Date(evento.dataFim).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p>Não há eventos futuros disponíveis.</p>
        )}
      </ul>
    </div>
  );
}
