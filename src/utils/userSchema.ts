// Define a interface para o usuário
interface EventoInscrito {
    eventoId: string;
    presencaValidada: boolean;
}

interface Certificado {
    certificadoId: string;
    emitidoEm: Date;
}

export interface Aluno {
    email: string;
    nome: string;
    tipo: "aluno";
    cpf: string;
    eventosInscritos: EventoInscrito[];
    certificados: Certificado[];
}

export interface Coordenador {
    email: string;
    nome: string;
    cpf: string;
    tipo: "coordenador";
    senha: string;
    eventosInscritos: EventoInscrito[];
    certificados: Certificado[];
}

