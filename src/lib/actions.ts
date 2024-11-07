import { Evento } from "@/utils/eventoSchema";
import moment from "moment-timezone";

export const obterEventoPorId = async (id: string): Promise<Evento | null> => {
  try {
    const response = await fetch(`/api/event/evento-por-id?id=${id}`);
    const data = await response.json();

    if (response.ok && data.evento) {
      return data.evento;
    } else {
      console.error(data.error || "Erro ao buscar evento.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return null;
  }
};

export const atualizarEvento = async (
  id: string,
  eventoAtualizado: Evento
): Promise<void> => {
  try {
    const response = await fetch(`/api/event/?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventoAtualizado),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Evento atualizado com sucesso:", data);
    } else {
      console.error(
        "Erro ao atualizar evento:",
        data.error || "Erro desconhecido."
      );
    }
  } catch (error) {
    console.error("Erro ao enviar solicitação para a API:", error);
    throw new Error("Erro ao atualizar o evento.");
  }
};

export const excluirEventoPorId = async (id: string) => {
  try {
    const response = await fetch("/api/event/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      console.log("Evento apagado com sucesso");
    } else {
      const error = await response.text();
      console.error("Erro:", error);
    }
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return null;
  }
};

export const buscaCpfEInscricao = async (
  cpf: string,
  eventoId: string
): Promise<{
  exists: boolean;
  nome?: string;
  email?: string;
  inscrito?: boolean;
}> => {
  try {
    const response = await fetch(
      `/api/buscaCpfInscricao?cpf=${cpf}&eventoId=${eventoId}`
    );
    const data = await response.json();

    if (data.exists) {
      return {
        exists: true,
        nome: data.nome,
        email: data.email,
        inscrito: data.inscrito,
      };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error("Erro ao verificar CPF e inscrição:", error);
    return { exists: false };
  }
};

export function obterFusoHorarioDoUsuario(): string {
  return moment.tz.guess();
}

export function formataData(data: string): string {
  const timezone = moment.tz.guess();
  return moment.tz(data, timezone).format("DD/MM/YYYY HH:mm");
}

export function converteISO(data: string): string {
  return moment(data, "DD/MM/YYYY HH:mm").toISOString();
}
