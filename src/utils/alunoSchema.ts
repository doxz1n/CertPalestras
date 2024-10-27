import * as Yup from "yup";

interface EventoInscrito {
  eventoId: string;
  presencaValidada: boolean;
}

export interface Aluno {
  email: string;
  nome: string;
  cpf: string;
  eventosInscritos?: EventoInscrito[];
}

export const alunoSchema: Yup.ObjectSchema<Aluno> = Yup.object().shape({
  email: Yup.string().email().required("Email é obrigatório"),
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  eventosInscritos: Yup.array()
    .of(
      Yup.object().shape({
        eventoId: Yup.string().required(),
        presencaValidada: Yup.boolean().required(),
      })
    )
    .optional(),
});

export default alunoSchema;
