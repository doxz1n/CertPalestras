import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

// Supondo que haja uma função para buscar os detalhes do evento
const getEventoById = async (id) => {
  // Lógica para buscar o evento pelo ID (pode ser uma chamada à API ou ao Firestore)
  const evento = {
    id: id,
    nome: "Nome do Evento",
    descricao: "Descrição do evento",
    dataInicio: new Date(),
    dataFim: new Date(),
    vagas: 50,
  };
  return evento;
};

const InscricaoEvento = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID do evento da URL
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    if (id) {
      // Carrega os dados do evento com base no ID
      getEventoById(id).then((data) => setEvento(data));
    }
  }, [id]);

  if (!evento) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Inscrição para {evento.nome}</h1>
      <p>{evento.descricao}</p>
      <p>
        <strong>Início:</strong> {moment(evento.dataInicio).format("DD/MM/YYYY HH:mm")}
      </p>
      <p>
        <strong>Fim:</strong> {moment(evento.dataFim).format("DD/MM/YYYY HH:mm")}
      </p>
      <p>
        <strong>Vagas Disponíveis:</strong> {evento.vagas}
      </p>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nome:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Seu nome"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Seu email"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirmar Inscrição
        </button>
      </form>
    </div>
  );
};

export default InscricaoEvento;
