"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import alunoSchema from "@/utils/alunoSchema"
import { Aluno } from "@/utils/userSchema";
const RegisterStudent: React.FC = () => {
  
const validationSchema = alunoSchema;

const initialValues:Aluno = {
  nome: "",
  email: "",
  cpf: "",
  tipo: "aluno",
  eventosInscritos: [],
  certificados: [],
};
  const handleSubmit = async (
    values: Aluno,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: "Aluno criado com sucesso!" });
      } else {
        setStatus({ error: result.message || "Erro ao criar aluno." });
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
                        className="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                        className="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                        htmlFor="cpf"
                        className="block text-sm font-medium text-gray-700"
                    >
                      CPF(APENAS NUMEROS)
                    </label>
                    <Field
                        name="cpf"
                        type="text"
                        className="mt-1 text-black block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                        name="cpf"
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
      <Footer/>
    </div>
  );
};

export default RegisterStudent;
