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

export const buscaCpf = async (cpf: string): Promise<boolean> => {
  try {
    const alunoRef = doc(db, "alunos", cpf);
    const alunoDoc = await getDoc(alunoRef);
    return alunoDoc.exists(); // Retorna true se o documento existir
  } catch (error) {
    console.error("Erro ao verificar CPF:", error);
    return false;
  }
};
