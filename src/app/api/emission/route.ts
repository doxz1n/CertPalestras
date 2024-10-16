import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {boolean} from "yup";

export async function GET(request: Request) {
    // Extract the event ID from the query parameters
    const searchParams = new URL(request.url).searchParams;
    const eventId = searchParams.get('id');

    if (!eventId) {
        return NextResponse.json({ error: "ID do evento não informado" }, { status: 400 });
    }

    try {
        // Get the event document from Firestore
        const eventRef = doc(db, 'eventos', eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
        }

        // Extract event data
        const eventoData = eventDoc.data();
        const nomeEvento = eventoData.nome;

        // Ensure 'inscritos' is an array and contains objects with 'cpf'
        const inscritosEvento: { cpf: string, presencaValidada:boolean }[] = eventoData?.inscritos;

        if (!inscritosEvento || !Array.isArray(inscritosEvento)) {
            return NextResponse.json({ error: "Lista de inscritos não encontrada ou malformada" }, { status: 400 });
        }

        // Check for validated students
        const alunosValidados = await Promise.all(inscritosEvento.map(async (inscrito, presencaValidada) => {
            const alunoCpf = inscrito.cpf; // Assume inscritos array contains objects with 'cpf' field
            const alunopresenca = inscrito.presencaValidada;

            try {
                const alunoRef = doc(db, 'alunos', alunoCpf );
                const alunoDoc = await getDoc(alunoRef);

                if (!alunoDoc.exists()) {
                    console.error(`Aluno com CPF ${alunoCpf} não encontrado`);
                    return null; // Skip this student if they don't exist
                }

                const alunoData = alunoDoc.data();
                const eventosInscritos= alunoData.eventosInscritos;

                // Find the event with validated attendance
                const eventoInscrito = eventosInscritos.find((inscrito: { eventoId: string, presencaValidada: boolean }) =>
                    eventId === eventId
                );

                // Return the validated student object if found
                return eventoInscrito ? {
                    nome: alunoData.nome,
                    cpf: alunoCpf,
                    presencaValidada: boolean,
                } : null;

            } catch (error) {
                console.error(`Erro ao processar aluno com CPF ${alunoCpf}:`, error);
                return null;
            }
        }));

        // Filter out null values (students without validated attendance)
        const alunosFiltrados = alunosValidados.filter(Boolean);

        // Return the event name and validated students
        return NextResponse.json({ nomeEvento, alunos: alunosFiltrados }, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar evento e alunos:", error);
        return NextResponse.json({ error: "Erro ao buscar evento e alunos" }, { status: 500 });
    }
}