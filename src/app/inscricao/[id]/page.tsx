import InscricaoForm from "@/components/InscricaoForm";
import { obterEventoPorId } from "../../../lib/actions"; // Certifique-se de que o caminho está correto
import { Evento } from "@/utils/eventoSchema";
import moment from "moment";

interface EventoPageProps {
  params: {
    id: string;
  };
}

const dateFormat = "DD/MM/YYYY HH:mm";

const EventoPage = async ({ params }: EventoPageProps) => {
  // Usando a função obterEventoPorId diretamente
  const evento = await obterEventoPorId(params.id);

  if (!evento) {
    return <p>Evento não encontrado {params.id}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500">{evento.nome}</h1>
      <p className="text-gray-700">{evento.descricao}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600">
          Data: {moment(evento.dataInicio).format(dateFormat)} -{" "}
          {moment(evento.dataFim).format(dateFormat)}
        </p>
        <p className="text-gray-600">Vagas: {evento.vagas}</p>

        <InscricaoForm eventoId={evento.id!} />
      </div>
    </div>
  );
};

export default EventoPage;
