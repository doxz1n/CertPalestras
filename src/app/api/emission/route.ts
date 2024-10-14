import {NextResponse} from 'next/server';
import {doc, getDoc, collection} from 'firebase/firestore';
import {db} from '@/lib/firebase';


export async function GET(request: Request) {


    //pega os Id's dos eventos do parametros da query
    const searchParams = new URL(request.url).searchParams;
    const eventId = searchParams.get('id');

    if (!eventId) {
        return NextResponse.json({error: "ID do evento não informado"}, {status: 400});
    }
    try {
        //Documento de referencia dos eventos da firestore
        const eventRef = doc(db, 'eventos', eventId,);
        const eventDoc = await getDoc(eventRef);


        if (!eventDoc.exists()) {
            return NextResponse.json({error: "Evento não encontrado"}, {status: 404});
        }

        // Dados do Evento
        const eventoData = eventDoc.data();
        const nomeEvento = eventoData.nome();

        const inscritosEvento: [] = eventoData.inscritos;

        //Validacao dos alunos e mapeamento de quais estao com presenca validada
        // Valida os alunos e mapeia os que têm presença validada
        const alunosValidados = await Promise.all(inscritosEvento.map(async (alunoCpf) => {
            const alunoRef = doc(db, 'alunos', alunoCpf);
            const alunoDoc = await getDoc(alunoRef);

            if (!alunoDoc.exists()) {
                console.error(`Aluno com CPF ${alunoCpf} não encontrado`);
                return null;
            }

            const alunoData = alunoDoc.data();
            const eventosInscritos: [] = alunoData.eventosInscritos;

            const eventoInscrito = eventosInscritos.find(({eventoId, presencaValidada}) =>
                eventoId === eventId && presencaValidada
            );

            return eventoInscrito && {
                nome: alunoData.nome,
                cpf: alunoCpf,
            };
        }))

        // Return event name and validated students
        return NextResponse.json({nomeEvento, alunos: alunosValidados}, {status: 200});

    } catch (error) {
        console.error("Erro ao buscar evento e alunos:", error);
        return NextResponse.json({error: "Erro ao buscar evento e alunos"}, {status: 500});
    }
}
