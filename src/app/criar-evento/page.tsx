"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import eventoSchema, { Evento } from "@/utils/eventoSchema";
import moment from "moment";

export default function Page() {
  const initialValues: Evento = {
    vagas: 0,
    dataInicio: "",
    dataFim: "",
    nome: "",
    descricao: "",
  };

  const dateFormat = "DD/MM/YYYY HH:mm"; // Formato esperado para as datas

  const handleSubmit = async (
    values: Evento,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      // Conversão de data
      const dataInicioFormatada = moment(values.dataInicio).format(
        dateFormat
      );
      const dataFimFormatada = moment(values.dataFim).format(dateFormat);
      const valoresConvertidos = {
        ...values,
        dataInicio: dataInicioFormatada,
        dataFim: dataFimFormatada,
      };
      //Envio
      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresConvertidos),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: "Evento criado com sucesso!" }); // Correção
      } else {
        setStatus({ error: result.message || "Erro ao criar evento!" });
      }
    } catch (error) {
      setStatus({ error: "Erro de comunicação com o servidor!" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex justify-center items-center p-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Criação de Evento
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={eventoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium">
                  Nome
                </label>
                <Field
                  id="nome"
                  name="nome"
                  type="text"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="vagas" className="block text-sm font-medium">
                  Vagas
                </label>
                <Field
                  id="vagas"
                  name="vagas"
                  type="number"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
                <ErrorMessage
                  name="vagas"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="dataInicio" className="block text-sm font-medium">
                  Data de Início
                </label>
                <Field
                  id="dataInicio"
                  name="dataInicio"
                  type="datetime-local"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
                <ErrorMessage
                  name="dataInicio"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="dataFim" className="block text-sm font-medium">
                  Data de Fim
                </label>
                <Field
                  id="dataFim"
                  name="dataFim"
                  type="datetime-local"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
                />
                <ErrorMessage
                  name="dataFim"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium">
                  Descrição
                </label>
                <Field
                  id="descricao"
                  name="descricao"
                  as="textarea"
                  className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md resize-none"
                  rows={4}
                />
                <ErrorMessage
                  name="descricao"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {status && status.success && (
                <div className="text-green-500 text-sm">{status.success}</div>
              )}
              {status && status.error && (
                <div className="text-red-500 text-sm">{status.error}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  Criar Evento
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
