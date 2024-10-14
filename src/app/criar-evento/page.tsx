// Page.tsx
"use client";

import { Evento } from "@/utils/eventoSchema";
import moment from "moment";
import EventoForm from "@/components/EventoForm";

export default function Page() {
  const dateFormat = "DD/MM/YYYY HH:mm"; // Formato esperado para as datas

  const handleSubmit = async (
    values: Evento,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      // Conversão de data
      const dataInicioFormatada = moment(values.dataInicio).format(dateFormat);
      const dataFimFormatada = moment(values.dataFim).format(dateFormat);
      const valoresConvertidos = {
        ...values,
        dataInicio: dataInicioFormatada,
        dataFim: dataFimFormatada,
      };
      //Envio
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresConvertidos),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: "Evento criado com sucesso!" });
      } else {
        setStatus({ error: result.message || "Erro ao criar evento!" });
      }
    } catch (error) {
      setStatus({ error: "Erro de comunicação com o servidor!" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex justify-center items-center p-4 ">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Criação de Evento
        </h2>
        <EventoForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
