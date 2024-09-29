import InscricaoForm from "@/components/InscricaoForm";
import { obterEventoPorId } from "../../../lib/actions"; // Certifique-se de que o caminho está correto
import { Evento } from "@/utils/eventoSchema";

interface EventoPageProps {
  params: {
    id: string;
  };
}

const EventoPage = async ({ params }: EventoPageProps) => {
  // Usando a função obterEventoPorId diretamente
  const evento = await obterEventoPorId(params.id);

  if (!evento) {
    return <p>Evento não encontrado {params.id}</p>;
  }

  return (
    <div>
      <h1>{evento.nome}</h1>
      <p>{evento.descricao}</p>
      <p>
        Data: {evento.dataInicio} - {evento.dataFim}
      </p>
      <p>Vagas: {evento.vagas}</p>

      <InscricaoForm eventoId={evento.id!} />
    </div>
  );
};

export default EventoPage;
