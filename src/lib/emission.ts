import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib'; // Usamos pdf-lib para modificar PDFs

// Definir a interface para garantir os tipos corretos
interface CertificadoData {
    nomeAluno: string;
    cpfAluno: string;
    nomeEvento: string;
    dataEvento: string;
}

// Função para gerar o PDF com os tipos explicitamente definidos
export async function gerarCertificado({ nomeAluno, cpfAluno, nomeEvento, dataEvento }: CertificadoData): Promise<Buffer> {
    // Caminho para o arquivo PDF do template
    const templatePath = path.resolve('./src/utils', 'CERTIFICADO_para_palestrante.pdf');

    // Carregar o arquivo PDF
    const pdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Pegar a primeira página do PDF
    const page = pdfDoc.getPage(0);

    // Definir as coordenadas para o nome do aluno, CPF e do evento
    const nomeAlunoCoords = { x: 300, y: 400 };
    const cpfAlunoCoords = { x: 300, y: 370 }; // Coordenadas separadas para o CPF
    const nomeEventoCoords = { x: 300, y: 320 };
    const dataEventoCoords = { x: 300, y: 290 };

    // Customizar o certificado com as informações do aluno e do evento
    page.drawText(nomeAluno, {
        x: nomeAlunoCoords.x,
        y: nomeAlunoCoords.y,
        size: 24,
        color: rgb(0, 0, 0),
    });

    page.drawText(cpfAluno, {
        x: cpfAlunoCoords.x,
        y: cpfAlunoCoords.y,
        size: 16,
        color: rgb(0, 0, 0),
    });

    page.drawText(nomeEvento, {
        x: nomeEventoCoords.x,
        y: nomeEventoCoords.y,
        size: 20,
        color: rgb(0, 0, 0),
    });

    page.drawText(dataEvento, {
        x: dataEventoCoords.x,
        y: dataEventoCoords.y,
        size: 20,
        color: rgb(0, 0, 0),
    });

    // Salvar o PDF modificado
    const pdfBytesFinal = await pdfDoc.save();
    return Buffer.from(pdfBytesFinal); // Retornar como buffer
}
