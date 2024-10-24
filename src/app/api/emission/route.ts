import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { gerarCertificado } from '@/lib/emission';

export async function GET(request: Request) {
    // Extrair o ID do evento dos parâmetros de consulta
    const searchParams = new URL(request.url).searchParams;
    const eventId = searchParams.get('id');

    if (!eventId) {
        return NextResponse.json({ error: "ID do evento não informado" }, { status: 400 });
    }

    try {
        // Obter o documento do evento no Firestore
        const eventRef = doc(db, 'eventos', eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
        }

        // Extrair dados do evento
        const eventoData = eventDoc.data();
        const nomeEvento = eventoData.nome;

        // Converter a data para o formato YYYY-MM-DD
        const dataEvento = new Date(eventoData.dataInicio).toISOString().split('T')[0];

        // Garantir que 'inscritos' seja um array e contenha objetos com 'cpf'
        const inscritosEvento: { cpf: string, presencaValidada: boolean }[] = eventoData?.inscritos || [];

        if (!inscritosEvento || !Array.isArray(inscritosEvento)) {
            return NextResponse.json({ error: "Lista de inscritos não encontrada ou malformada" }, { status: 400 });
        }

        // Verificar os alunos com presença validada
        const alunosValidados = await Promise.all(inscritosEvento.map(async (inscrito) => {
            const alunoCpf = inscrito.cpf;
            const presencaValidada = inscrito.presencaValidada;

            try {
                const alunoRef = doc(db, 'alunos', alunoCpf);
                const alunoDoc = await getDoc(alunoRef);

                if (!alunoDoc.exists()) {
                    console.error(`Aluno com CPF ${alunoCpf} não encontrado`);
                    return null; // Ignorar este aluno se ele não existir
                }

                const alunoData = alunoDoc.data();
                const eventosInscritos = alunoData.eventosInscritos;

                // Encontrar o evento com presença validada
                const eventoInscrito = eventosInscritos.find((inscrito: { eventoId: string, presencaValidada: boolean }) =>
                    inscrito.eventoId === eventId && inscrito.presencaValidada
                );

                if (eventoInscrito) {
                    // Gerar o certificado para o aluno com presença validada
                    gerarCertificado(eventoInscrito);

                    // Retornar o aluno validado, se encontrado
                    return {
                        nome: alunoData.nome,
                        cpf: alunoCpf,
                        nomeEvento: nomeEvento,
                        dataEvento: dataEvento,
                    };
                }

                return null;

            } catch (error) {
                console.error(`Erro ao processar aluno com CPF ${alunoCpf}:`, error);
                return null;
            }
        }));

        // Filtrar valores nulos (alunos sem presença validada)
        const alunosFiltrados = alunosValidados.filter(Boolean);

        // Retornar o nome do evento, a data formatada e os alunos validados
        return NextResponse.json({ nomeEvento, dataEvento, alunos: alunosFiltrados }, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar evento e alunos:", error);
        return NextResponse.json({ error: "Erro ao buscar evento e alunos" }, { status: 500 });
    }
}
