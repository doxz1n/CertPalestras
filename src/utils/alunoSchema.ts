import * as Yup from "yup";

interface EventoInscrito {
  eventoId: string;
  presencaValidada: boolean;
}

interface Certificado {
  certificadoId: string;
  emitidoEm: Date;
}

export interface Aluno {
  email: string;
  nome: string;
  cpf: string;
  eventosInscritos?: EventoInscrito[];
  certificados?: Certificado[];
}

const alunoSchema: Yup.ObjectSchema<Aluno> = Yup.object().shape({
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
  certificados: Yup.array()
    .of(
      Yup.object().shape({
        certificadoId: Yup.string().required(),
        emitidoEm: Yup.date().required(),
      })
    )
    .optional(),
});

export default alunoSchema;
