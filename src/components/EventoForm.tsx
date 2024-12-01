import { Formik, Form, Field, ErrorMessage } from "formik";
import eventoSchema, { Evento } from "@/utils/eventoSchema";

interface EventoFormProps {
  onSubmit: (
    values: Evento,
    { setSubmitting, setStatus }: any
  ) => Promise<void>;
}

const EventoForm: React.FC<EventoFormProps> = ({ onSubmit }) => {
  const initialValues: Evento = {
    vagas: 0,
    horas: 0,
    dataInicio: "",
    dataFim: "",
    dataEvento: "",
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
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700">
              Nome do Evento
            </label>
            <Field
              id="nome"
              name="nome"
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage
              name="nome"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="vagas" className="block text-gray-700">
              Vagas
            </label>
            <Field
              id="vagas"
              name="vagas"
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage
              name="vagas"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dataInicio" className="block text-gray-700">
              Início das Inscrições
            </label>
            <Field
              id="dataInicio"
              name="dataInicio"
              type="datetime-local"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage
              name="dataInicio"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dataFim" className="block text-gray-700">
              Fim das Inscriçoes
            </label>
            <Field
              id="dataFim"
              name="dataFim"
              type="datetime-local"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage
              name="dataFim"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dataEvento" className="block text-gray-700">
              Data do Evento
            </label>
            <Field
              id="dataEvento"
              name="dataEvento"
              type="datetime-local"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <ErrorMessage
              name="dataEvento"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="horas" className="block text-gray-700">
              Horas do Certificado
            </label>
            <Field
              id="horas"
              name="horas"
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Quantidade de horas para o certificado"
            />
            <ErrorMessage
              name="horas"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descricao" className="block text-gray-700">
              Descrição
            </label>
            <Field
              id="descricao"
              name="descricao"
              as="textarea"
              className="w-full px-4 py-2 border rounded-lg resize-none"
              rows={4}
            />
            <ErrorMessage
              name="descricao"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
