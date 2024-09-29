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

export const verificaInscricao = async (
  cpf: string,
  eventoId: string
): Promise<boolean> => {
  try {
    // Referência ao documento do evento
    const eventoRef = doc(db, "eventos", eventoId);

    // Obtém o documento do evento
    const eventoDoc = await getDoc(eventoRef);

    // Verifica se o documento existe
    if (!eventoDoc.exists()) {
      throw new Error("Evento não encontrado");
    }

    // Obtém os dados do evento
    const eventoData = eventoDoc.data();

    // Verifica se o CPF está na lista de inscritos
    const inscritos: { nome: string; cpf: string }[] =
      eventoData.inscritos || [];
    return inscritos.some((inscrito) => inscrito.cpf === cpf); // Retorna true se o CPF estiver na lista
  } catch (error) {
    console.error("Erro ao verificar inscrição:", error);
    throw new Error("Erro ao verificar inscrição"); // Lidar com erro adequadamente
  }
};
