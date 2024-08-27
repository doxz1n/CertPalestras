"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ATUALIZAR: UTILIZE O USERSCHEMA
const validationSchema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  eventosInscritos: Yup.array().of(Yup.string()),
  certificados: Yup.array().of(Yup.string()),
});

const initialValues = {
  nome: "",
  email: "",
  senha: "",
  eventosInscritos: [],
  certificados: [],
};

const RegisterTeacher: React.FC = () => {
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, tipo: "coordenador" }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: "Coordenador criado com sucesso!" });
      } else {
        setStatus({ error: result.message || "Erro ao criar coordenador." });
      }
    } catch (error) {
      setStatus({ error: "Erro de comunicação com o servidor." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-blue-500">
      <Header />
      <main className="bg-white dark:bg-black flex items-center justify-center flex-grow">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <Field
                    name="nome"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="nome"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="senha"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Senha
                  </label>
                  <Field
                    name="senha"
                    type="password"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="senha"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Cadastrar"}
                </button>

                {status && status.success && (
                  <div className="text-green-500 mt-4">{status.success}</div>
                )}
                {status && status.error && (
                  <div className="text-red-500 mt-4">{status.error}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterTeacher;
