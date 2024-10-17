"use client";

import { Evento } from "@/utils/eventoSchema";
import moment from "moment-timezone";
import EventoForm from "@/components/EventoForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const dateFormat = "DD/MM/YYYY HH:mm"; // Formato esperado para exibição
  const uid = localStorage.getItem("uid");
  const router = useRouter();
  const handleSubmit = async (
    values: Evento,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      // Forçando o uso do fuso horário 'America/Sao_Paulo' e formatando
      const dataInicioFormatada = moment
        .tz(values.dataInicio, "America/Sao_Paulo")
        .format(dateFormat);
      const dataFimFormatada = moment
        .tz(values.dataFim, "America/Sao_Paulo")
        .format(dateFormat);

      const valoresConvertidos = {
        ...values,
        dataInicio: dataInicioFormatada,
        dataFim: dataFimFormatada,
        idCoordenador: uid,
      };

      // Envio
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
        setTimeout(() => {
          router.push("/");
        }, 3000); // Aumenta o tempo de espera
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
    <main className="flex-grow flex justify-center items-center p-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Criação de Evento
        </h2>
        <EventoForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
