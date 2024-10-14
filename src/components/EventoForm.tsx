// EventoForm.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import eventoSchema, { Evento } from "@/utils/eventoSchema";
import moment from "moment";

interface EventoFormProps {
  onSubmit: (
    values: Evento,
    { setSubmitting, setStatus }: any
  ) => Promise<void>;
}

const EventoForm: React.FC<EventoFormProps> = ({ onSubmit }) => {
  const initialValues: Evento = {
    vagas: 0,
    dataInicio: "",
    dataFim: "",
    nome: "",
    descricao: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventoSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium">
              Nome do Evento
            </label>
            <Field
              id="nome"
              name="nome"
              type="text"
              className="mt-1 p-3 block w-full border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="nome"
              component="div"
              className="text-red-500 text-sm mt-1"
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
              className="mt-1 p-3 block w-full border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="vagas"
              component="div"
              className="text-red-500 text-sm mt-1"
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
              className="mt-1 p-3 block w-full border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="dataInicio"
              component="div"
              className="text-red-500 text-sm mt-1"
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
              className="mt-1 p-3 block w-full border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="dataFim"
              component="div"
              className="text-red-500 text-sm mt-1"
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
              className="mt-1 p-3 block w-full border bg-gray-900 border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <ErrorMessage
              name="descricao"
              component="div"
              className="text-red-500 text-sm mt-1"
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
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            >
              Criar Evento
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventoForm;
