"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Coordenador, coordenadorSchema } from "@/utils/coordenadorSchema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RegistroCoordenador: React.FC = () => {
  const validationSchema = coordenadorSchema;

  const initialValues: Coordenador = {
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await fetch("/api/coordinator/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
    <main className="flex-grow flex justify-center items-center p-4 ">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Cadastro Coordenador
        </h2>
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
                  className="block text-sm font-medium text-gray-300"
                >
                  Nome
                </label>
                <Field
                  name="nome"
                  type="text"
                  className="mt-1 text-white block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 text-white block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  className="block text-sm font-medium text-gray-300"
                >
                  CPF
                </label>
                <Field
                  name="cpf"
                  type="text"
                  className="mt-1 text-white block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="cpf"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-300"
                >
                  Senha
                </label>
                <Field
                  name="senha"
                  type="password"
                  className="mt-1 text-white block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
  );
};

export default RegistroCoordenador;
