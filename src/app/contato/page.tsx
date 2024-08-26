"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "@/components/Layout";

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
    <Layout>
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center">
        {/* 
          flex-col: Alinha os itens filhos em uma coluna.
          flex-1: Permite que o main ocupe o máximo de altura disponível entre o header e o footer.
          items-center: Alinha os itens no centro horizontalmente.
          justify-center: Alinha os itens no centro verticalmente.
        */}
        <div className="bg-blue-900 text-white p-8 rounded-lg max-w-lg w-full">
          {/* 
            bg-blue-900: Define o background do formulário como azul escuro.
            text-white: Define a cor do texto como branco.
            p-8: Aplica 2rem (32px) de padding ao redor do conteúdo.
            rounded-lg: Aplica bordas arredondadas grandes ao contêiner.
            max-w-lg: Define a largura máxima do contêiner como large (32rem ou 512px).
            w-full: Faz com que o contêiner ocupe toda a largura disponível dentro de seu pai.
          */}
          <h1 className="text-2xl font-bold mb-6">Entre em Contato</h1>
          {/* 
            text-2xl: Define o tamanho do texto como 2xl (1.5rem ou 24px).
            font-bold: Aplica peso de fonte negrito ao texto.
            mb-6: Aplica uma margem inferior de 1.5rem (24px) abaixo do título.
          */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm font-medium">
                    Nome
                  </label>
                  <Field
                    type="text"
                    name="nome"
                    id="nome"
                    className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md"
                  />
                  <ErrorMessage
                    name="nome"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md"
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
                    className="block text-sm font-medium"
                  >
                    Mensagem
                  </label>
                  <Field
                    as="textarea"
                    name="mensagem"
                    id="mensagem"
                    className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md"
                  />
                  <ErrorMessage
                    name="mensagem"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  Enviar
                </button>

                {status?.success && (
                  <div className="text-green-500 text-sm mt-2">
                    {status.success}
                  </div>
                )}
                {status?.error && (
                  <div className="text-red-500 text-sm mt-2">
                    {status.error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
