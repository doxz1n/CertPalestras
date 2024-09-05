import * as Yup from "yup";
import {Coordenador} from "@/utils/userSchema";

// @ts-ignore
const coordenadorSchema: Yup.ObjectSchema<Coordenador> = Yup.object().shape({
    email: Yup.string().email().required(),
    nome: Yup.string().required(),
    senha: Yup.string().required(),
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

export default coordenadorSchema;