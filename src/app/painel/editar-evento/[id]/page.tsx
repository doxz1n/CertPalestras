"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obterEventoPorId, atualizarEvento } from "@/lib/actions";
import { ErroAlerta, SucessoAlerta } from "@/components/Mensagem";

interface EditarEventoPageProps {
  params: {
    id: string;
  };
}

const EditarEvento = ({ params }: EditarEventoPageProps) => {
  const [evento, setEvento] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [vagas, setVagas] = useState<number>(0);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [dataEvento, setDataEvento] = useState<string>("");
  const [horas, setHoras] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvento = async () => {
      setLoading(true);
      try {
        const eventoData = await obterEventoPorId(params.id);
        console.log(eventoData);
        if (eventoData) {
          setEvento(eventoData);
          setNome(eventoData.nome);
          setDescricao(eventoData.descricao);
          setVagas(eventoData.vagas);
          setDataInicio(eventoData.dataInicio);
          setDataFim(eventoData.dataFim);
          setDataEvento(eventoData.dataEvento);
          setHoras(eventoData.horas);
        }
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
        ErroAlerta("Erro ao buscar evento.");
      }
      setLoading(false);
    };

    fetchEvento();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await atualizarEvento(params.id, {
        nome,
        descricao,
        vagas,
        dataInicio,
        dataFim,
        dataEvento,
        horas,
      });
      SucessoAlerta(
        "Evento editado com sucesso!",
        `/painel/evento/${params.id}`,
        router
      );
    } catch (error: any) {
      console.error("Erro ao atualizar evento:", error);
      ErroAlerta("Erro no servidor.", error);
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
          <label className="block text-gray-700">Início das Inscrições</label>
          <input
            type="datetime-local"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fim das Inscriçoes</label>
          <input
            type="datetime-local"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data do Evento</label>
          <input
            type="datetime-local"
            value={dataEvento}
            onChange={(e) => setDataEvento(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Horas do Certificado</label>
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
