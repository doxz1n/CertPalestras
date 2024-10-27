"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obterEventoPorId, atualizarEvento } from "@/lib/actions";
import moment from "moment";

interface EditarEventoPageProps {
  params: {
    id: string;
  };
}

const dateFormat = "DD/MM/YYYY HH:mm";

const EditarEvento = ({ params }: EditarEventoPageProps) => {
  const [evento, setEvento] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [vagas, setVagas] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [horas, setHoras] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvento = async () => {
      setLoading(true);
      const eventoData = await obterEventoPorId(params.id);
      console.log(eventoData);
      if (eventoData) {
        setEvento(eventoData);
        setNome(eventoData.nome);
        setDescricao(eventoData.descricao);
        setVagas(eventoData.vagas);
        setDataInicio(moment(eventoData.dataInicio).format(dateFormat)); // Formatar data de início
        setDataFim(moment(eventoData.dataFim).format(dateFormat)); // Formatar data de fim
        setHoras(eventoData.horas);
      }
      setLoading(false);
    };

    fetchEvento();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converter as datas do formulário de volta para o formato ISO
    const dataInicioISO = moment(dataInicio, dateFormat).toISOString();
    const dataFimISO = moment(dataFim, dateFormat).toISOString();

    try {
      await atualizarEvento(params.id, {
        nome,
        descricao,
        vagas,
        dataInicio: dataInicioISO,
        dataFim: dataFimISO,
        horas,
      });
      router.push(`/painel/evento/${params.id}`); // Redireciona após atualização
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Editar Evento</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome do Evento</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Vagas</label>
          <input
            type="number"
            value={vagas}
            onChange={(e) => setVagas(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Início</label>
          <input
            type="text"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="DD/MM/YYYY HH:mm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Fim</label>
          <input
            type="text"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="DD/MM/YYYY HH:mm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Horas</label>
          <input
            type="number"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarEvento;
