import * as Yup from "yup";
import {Aluno} from "@/utils/userSchema";

// @ts-ignore
const alunoSchema: Yup.ObjectSchema<Aluno> = Yup.object().shape({
    email: Yup.string().email().required(),
    nome: Yup.string().required(),
    cpf: Yup.string().required(),
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

export default alunoSchema;