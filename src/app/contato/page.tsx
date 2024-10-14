"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function Contato() {
  const initialValues: FormData = {
    nome: "",
    email: "",
    mensagem: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    mensagem: Yup.string().required("Mensagem é obrigatória"),
  });

  const handleSubmit = async (
    values: FormData,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: "Contato adicionado com sucesso!" });
      } else {
        setStatus({ error: result.message || "Erro ao adicionar contato." });
      }
    } catch (error) {
      setStatus({ error: "Erro de comunicação com o servidor." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Entre em Contato
        </h1>
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
                  type="text"
                  name="nome"
                  id="nome"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <Field
                  as="textarea"
                  name="mensagem"
                  id="mensagem"
                  rows={4}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="mensagem"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                Enviar
              </button>

              {status?.success && (
                <div className="text-green-500 text-sm mt-2 text-center">
                  {status.success}
                </div>
              )}
              {status?.error && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {status.error}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
