import * as Yup from "yup";

// Define a interface para o usuário
interface EventoInscrito {
  eventoId: string;
  presencaValidada: boolean;
}

interface Certificado {
  certificadoId: string;
  emitidoEm: Date;
}

//
export interface Usuario {
  email: string;
  nome: string;
  tipo: "aluno" | "coordenador";
  senha: string;
  eventosInscritos: EventoInscrito[];
  certificados: Certificado[];
}

// Define o schema de validação usando Yup
const userSchema: Yup.ObjectSchema<Usuario> = Yup.object().shape({
  email: Yup.string().email().required(),
  nome: Yup.string().required(),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required(),
  tipo: Yup.mixed<"aluno" | "coordenador">()
    .oneOf(["aluno", "coordenador"])
    .required(),
  eventosInscritos: Yup.array()
    .of(
      Yup.object().shape({
        eventoId: Yup.string().required(),
        presencaValidada: Yup.boolean().required(),
      })
    )
    .required(),
  certificados: Yup.array()
    .of(
      Yup.object().shape({
        certificadoId: Yup.string().required(),
        emitidoEm: Yup.date().required(),
      })
    )
    .required(),
});

export default userSchema;
