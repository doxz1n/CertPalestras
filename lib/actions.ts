import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Evento } from "@/utils/eventoSchema";

export async function fetchEventobyId(id: string) {
  const docRef = doc(db, "eventos", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const eventoData = docSnap.data();
    return {
      vagas: eventoData.vagas,
      dataInicio: eventoData.dataInicio,
      dataFim: eventoData.dataFim,
      nome: eventoData.nome,
      descricao: eventoData.descricao,
    } as Evento;
  } else {
    return null;
  }
}
