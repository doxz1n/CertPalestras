import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Importe a instância do Firestore
import { Evento } from "@/utils/eventoSchema"; // Importe a interface do evento

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
