import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Contato() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const router = useRouter();

  const valoresIniciais = {
    nome: "",
    email: "",
    mensagem: "",
  };

  const validacaoSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatorio"),
    email: Yup.string().email("Email invalido").required("Campo obrigatorio"),
    mensagem: Yup.string().required("Campo obrigatorio"),
  });

  function Oi() {
    console.log("Oi");
  }

  return (
    <>
      <Head>
        <title> CertTarefas </title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-3x1">Entre em Contato Conosco</h2>
        <Formik
          initialValues={valoresIniciais}
          validationSchema={validacaoSchema}
          onSubmit={Oi}
        >
          {({ isSubmitting }) => (
            <Form
              className="shadow appearance-none border rounded
			w-full py-2 px-3 text-gray-700 leading-tight
			focus:outline-none focus:shadow-outline"
            >
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nome
                </label>
                <Field
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Nome"
                />
                <ErrorMessage name="Nome" component="text-danger" />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="nome@dominio.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message">Mensagem</label>
                <Field
                  type="text"
                  name="mensagem"
                  className="fom-control"
                  placeholder="Sua mensagem"
                />
                <ErrorMessage
                  name="mensagem"
                  component="div"
                  className="text-dange"
                />
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

export default Contato;
