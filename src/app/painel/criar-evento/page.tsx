"use client";

import { Evento } from "@/utils/eventoSchema";
import EventoForm from "@/components/EventoForm";
import { useRouter } from "next/navigation";
import Voltar from "@/components/Voltar";
import { SucessoAlerta, ErroAlerta } from "@/components/Mensagem";
export default function Page() {
  const uid = localStorage.getItem("uid");
  const router = useRouter();
  const handleSubmit = async (values: Evento, { setSubmitting }: any) => {
    try {
      const valoresConvertidos = {
        ...values,
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
        SucessoAlerta(
          "Evento criado com sucesso!",
          `/painel/evento/${result.eventoId}`,
          router
        );
      } else {
        ErroAlerta("Erro ao criar o evento", result.message);
      }
    } catch (error: any) {
      ErroAlerta("Erro de comunicação com o servidor!", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Voltar />
      <h1 className="text-2xl font-semibold mb-4">Criação de Evento</h1>
      <EventoForm onSubmit={handleSubmit} />
    </div>
  );
}
