import {NextResponse} from "next/server";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";

export async function GET(request) {
    try {
      // Obtém o ID do evento a partir dos parâmetros da URL
      const { searchParams } = new URL(request.url);
      const eventId = searchParams.get('id'); // Captura o ID do evento
      
      if (!eventId) {
        return NextResponse.json({ error: "ID do evento não informado" }, { status: 400 });
      }
  
      const eventRef = doc(db, "eventos", eventId);
      const eventoDoc = await getDoc(eventRef)
      
      if (!eventoDoc.exists()) {
        return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
      }
  
      const evento = eventoDoc.data(); // Obtém os dados do evento
      const nomeEvento = evento.nome; // Supondo que o evento tenha o campo "nome"
  
      const alunosSnapshot = await getDocs(collection(eventosCollection, eventId, 'alunos'));
      
      const alunosValidados = alunosSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() })) // Mapeia os dados dos alunos
        .filter(aluno => aluno.presencaValidada === true) // Filtra alunos com presença validada
        .map(aluno => ({
          cpf: aluno.cpf, // Supondo que os dados do aluno tenham "cpf"
        }));
  
      // Verifica se há alunos com presença validada
      if (alunosValidados.length === 0) {
        return NextResponse.json({ message: "Nenhum aluno com presença validada" }, { status: 404 });
      }
  
      return NextResponse.json({ nomeEvento, alunos: alunosValidados }, { status: 200 });
  
    } catch (error) {
      console.error("Erro ao buscar evento e alunos:", error);
  
      
      return NextResponse.json({ error: "Erro ao buscar evento e alunos" }, { status: 500 });
    }
  }
  