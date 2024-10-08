import * as Yup from "yup";
import moment from "moment";

export interface Evento {
  id?: string // O ID é opcional, pois ele pode ser gerado automaticamente
  vagas: number;
  dataInicio: string; // Usando string para armazenar a data formatada
  dataFim: string;
  nome: string;
  descricao: string;
}

// Validação do schema com Moment.js para garantir o formato correto
const eventoSchema: Yup.ObjectSchema<Evento> = Yup.object().shape({
  id: Yup.string().optional(), // 'id' é opcional
  vagas: Yup.number().required("Número de vagas é obrigatório"),
  dataInicio: Yup.string()
    .required("Data de início é obrigatória")
    .test("dataInicio", "Data de início inválida", (value) => {
      // Permite os dois formatos de data
      return moment(value, "YYYY-MM-DDTHH:mm", true).isValid() || 
             moment(value, "DD/MM/YYYY HH:mm", true).isValid();
    }),
  dataFim: Yup.string()
    .required("Data de fim é obrigatória")
    .test("dataFim", "Data de fim inválida", (value) => {
      return moment(value, "YYYY-MM-DDTHH:mm", true).isValid() || 
             moment(value, "DD/MM/YYYY HH:mm", true).isValid();
    }),
  nome: Yup.string().required("Nome do evento é obrigatório"),
  descricao: Yup.string().required("Descrição do evento é obrigatória"),
});

export default eventoSchema;
