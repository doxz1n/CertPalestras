import * as Yup from "yup";

interface EventoCriado {
  eventoId: string;
}

export interface Coordenador {
  email: string;
  nome: string;
  cpf: string;
  senha: string;
  eventosCriados?: EventoCriado[];
}

export const coordenadorSchema: Yup.ObjectSchema<Coordenador> =
  Yup.object().shape({
    email: Yup.string()
      .email("O e-mail deve ser válido")
      .required("Email é obrigatório"),
    nome: Yup.string().required("Nome é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatório"),
    cpf: Yup.string()
      .min(11, "O CPF deve conter 11 caracteres")
      .max(11, "O CPF deve conter 11 caracteres")
      .required("CPF é obrigatório"),
    eventosCriados: Yup.array()
      .of(
        Yup.object().shape({
          eventoId: Yup.string().required(),
        })
      )
      .optional(),
  });
