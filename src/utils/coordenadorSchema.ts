import * as Yup from "yup";

interface EventoCriado {
  eventoId: string;
}

interface CertificadoEmitido {
  certificadoId: string;
  emitidoEm: Date;
}

export interface Coordenador {
  email: string;
  nome: string;
  cpf: string;
  senha: string;
  eventosCriados?: EventoCriado[];
  certificadosEmitidos?: CertificadoEmitido[];
}

export const coordenadorSchema: Yup.ObjectSchema<Coordenador> =
  Yup.object().shape({
    email: Yup.string().email().required("Email é obrigatório"),
    nome: Yup.string().required("Nome é obrigatório"),
    senha: Yup.string().min(6).required("Senha é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório"),
    eventosCriados: Yup.array()
      .of(
        Yup.object().shape({
          eventoId: Yup.string().required(),
        })
      )
      .optional(),
    certificadosEmitidos: Yup.array()
      .of(
        Yup.object().shape({
          certificadoId: Yup.string().required(),
          emitidoEm: Yup.date().required(),
        })
      )
      .optional(),
  });
