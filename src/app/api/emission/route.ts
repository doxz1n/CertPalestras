import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { editarTemplate } from "@/lib/emission";
import moment from "moment";
import JSZip from "jszip";
import { Evento } from "@/utils/eventoSchema";
import { Aluno } from "@/utils/alunoSchema";
import { Coordenador } from "@/utils/coordenadorSchema";
import InputMask from "react-input-mask";

const dateFormat = "DD/MM/YYYY HH:mm";
const CHUNK_SIZE = 5;

async function fetchDocument<T>(ref: any): Promise<T | null> {
  const docSnapshot = await getDoc(ref);
  return docSnapshot.exists() ? (docSnapshot.data() as T) : null;
}

interface EventoInfo {
  nomeEvento: string;
  dataEvento: string;
  nomeCoordenador: string;
  horasEvento: number;
}

async function processAlunoCertificado(
  alunoData: Aluno,
  eventoInfo: EventoInfo,
  zip: JSZip,
  fileName: string,
  cpf: string
) {
  const cpfFormatado = formatCpf(cpf);
  const certificadoDocx = await editarTemplate({
    nomeAluno: alunoData.nome,
    cpfAluno: cpfFormatado,
    nomeEvento: eventoInfo.nomeEvento,
    dataEvento: eventoInfo.dataEvento,
    horasEvento: eventoInfo.horasEvento,
    nomeCoordenador: eventoInfo.nomeCoordenador,
  });

  zip.file(fileName, certificadoDocx, { binary: false });
}

function formatCpf(cpf: string): string {
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const eventId = searchParams.get("id");

  if (!eventId) {
    return NextResponse.json(
      { error: "ID do evento não informado" },
      { status: 400 }
    );
  }

  try {
    const eventRef = doc(db, "eventos", eventId);
    const eventData = await fetchDocument<Evento>(eventRef);

    if (!eventData) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    const {
      nome: nomeEvento,
      idCoordenador,
      dataInicio,
      dataFim,
      inscritos = [],
      horas: horasEvento,
    } = eventData;

    if (!idCoordenador) {
      return NextResponse.json(
        { error: "ID do coordenador não encontrado no evento" },
        { status: 400 }
      );
    }

    const coordenadorRef = doc(db, "coordenadores", idCoordenador);
    const coordenadorData = await fetchDocument<Coordenador>(coordenadorRef);

    if (!coordenadorData) {
      return NextResponse.json(
        { error: "Coordenador não encontrado" },
        { status: 404 }
      );
    }

    const formattedDataEvento = `${moment(dataInicio).format(
      dateFormat
    )} a ${moment(dataFim).format(dateFormat)}`;
    const eventoInfo: EventoInfo = {
      nomeEvento,
      dataEvento: formattedDataEvento,
      nomeCoordenador: coordenadorData.nome,
      horasEvento,
    };

    const zip = new JSZip();

    for (let i = 0; i < inscritos.length; i += CHUNK_SIZE) {
      const chunk = inscritos.slice(i, i + CHUNK_SIZE);

      await Promise.all(
        chunk.map(async ({ cpf, presencaValidada }) => {
          if (!presencaValidada) return;

          const alunoRef = doc(db, "alunos", cpf);
          const alunoData = await fetchDocument<Aluno>(alunoRef);

          if (!alunoData) {
            console.error(`Aluno com CPF ${cpf} não encontrado`);
            return;
          }

          const isPresent = alunoData.eventosInscritos?.some(
            (e) => e.eventoId === eventId && e.presencaValidada
          );

          if (isPresent) {
            const fileName = `${nomeEvento}_${alunoData.nome.replace(
              /[^a-zA-Z0-9]/g,
              "_"
            )}.docx`;
            await processAlunoCertificado(
              alunoData,
              eventoInfo,
              zip,
              fileName,
              cpf
            );
          }
        })
      );
    }

    const zipContent = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 5 },
    });

    if (zipContent.length === 0) {
      return NextResponse.json(
        { error: "Nenhum certificado foi gerado." },
        { status: 404 }
      );
    }

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${nomeEvento}_certificados.zip"`,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar evento e gerar certificados:", error);
    return NextResponse.json(
      { error: "Erro ao buscar evento e gerar certificados" },
      { status: 500 }
    );
  }
}
