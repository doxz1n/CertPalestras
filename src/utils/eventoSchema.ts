import * as Yup from "yup";
import moment from "moment";

export interface Evento {
  vagas: number;
  dataInicio: string; // Usando string para armazenar a data formatada
  dataFim: string;
  nome: string;
  descricao: string;
}

// Definindo o formato de data desejado
const dateFormat = "DD/MM/YYYY HH:mm";

// Validação do schema com Moment.js para garantir o formato correto
const eventoSchema: Yup.ObjectSchema<Evento> = Yup.object().shape({
  vagas: Yup.number().required("Número de vagas é obrigatório"),
  dataInicio: Yup.string()
    .required("Data de início é obrigatória")
    .test("dataInicio", "Data de início inválida", (value) => {
      return moment(value, dateFormat, true).isValid(); // Verifica se a data está no formato correto
    }),
  dataFim: Yup.string()
    .required("Data de fim é obrigatória")
    .test("dataFim", "Data de fim inválida", (value) => {
      return moment(value, dateFormat, true).isValid();
    }),
  nome: Yup.string().required("Nome do evento é obrigatório"),
  descricao: Yup.string().required("Descrição do evento é obrigatória"),
});

export default eventoSchema;
