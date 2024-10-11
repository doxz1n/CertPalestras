import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Importe a instância do Firestore
import { Evento } from "@/utils/eventoSchema"; // Importe a interface do evento

export const obterEventoPorId = async (id: string): Promise<Evento | null> => {
  try {
    const eventoRef = doc(db, "eventos", id); // Referência ao documento com o ID
    const eventoDoc = await getDoc(eventoRef); // Obtém o documento pelo ID

    if (eventoDoc.exists()) {
      // Converte o documento em um objeto do tipo Evento
      const eventoData = eventoDoc.data();
      const evento: Evento = {
        id: eventoDoc.id,
        vagas: eventoData?.vagas,
        dataInicio: eventoData?.dataInicio,
        dataFim: eventoData?.dataFim,
        nome: eventoData?.nome,
        descricao: eventoData?.descricao,
      };

      return evento;
    } else {
      console.log(`Evento com ID ${id} não encontrado.`);
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
