import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import officeToPdf from "office-to-pdf";
import moment from "moment-timezone";

interface CertificadoData {
  nomeAluno: string;
  cpfAluno: string;
  nomeEvento: string;
  dataEvento: string;
  nomeCoordenador: string;
  dataEmissao?: string; // Data de emissão do certificado
}

/**
 * Função para editar um template DOCX e gerar um PDF com os dados do certificado.
 * @param data - Dados a serem inseridos no template.
 * @returns Um buffer contendo o arquivo PDF gerado.
 */
export async function editarTemplate(data: CertificadoData): Promise<Buffer> {
  // Formata a data de emissão no fuso horário de São Paulo
  data.dataEmissao = moment()
    .tz("America/Sao_Paulo")
    .format("DD/MM/YYYY HH:mm");

  // Lê o template em formato DOCX do diretório público
  const content = fs.readFileSync(
    path.resolve("./public", "Certificado.docx"),
    "binary"
  );
  if (!content) {
    throw new Error(
      "O conteúdo do arquivo DOCX está vazio ou não foi lido corretamente."
    );
  }

  // Inicializa PizZip para manipular o conteúdo do DOCX
  const zip = new PizZip(content);

  // Inicializa o Docxtemplater com o conteúdo ZIP
  const doc = new Docxtemplater(zip);

  // Define os dados a serem substituídos no documento
  doc.setData(data);

  // Renderiza o documento com os dados fornecidos
  doc.render();

  // Gera o arquivo DOCX editado como um buffer
  const docxBuffer = doc.getZip().generate({ type: "nodebuffer" });

  return docxBuffer;
}
