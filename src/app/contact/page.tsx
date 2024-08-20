"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function Contato() {
  const initialValues: FormData = {
    nome: '',
    email: '',
    mensagem: ''
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    mensagem: Yup.string().required('Mensagem é obrigatória'),
  });

  const handleSubmit = async (values: FormData, { setSubmitting, setStatus }: any) => {
    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <div className="flex flex-col h-screen justify-between bg-blue-500">
        <Header/>

        <main className="flex-grow flex items-center justify-center">
          <div className="bg-black text-white p-8 rounded-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-6">Entre em Contato</h1>
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
                          className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                      />
                      <ErrorMessage name="nome" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email
                      </label>
                      <Field
                          type="email"
                          name="email"
                          id="email"
                          className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="mensagem" className="block text-sm font-medium">
                        Mensagem
                      </label>
                      <Field
                          as="textarea"
                          name="mensagem"
                          id="mensagem"
                          className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                      />
                      <ErrorMessage name="mensagem" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        disabled={isSubmitting}
                    >
                      Enviar
                    </button>

                    {status && status.success && (
                        <div className="text-green-500 text-sm mt-2">
                          {status.success}
                        </div>
                    )}
                    {status && status.error && (
                        <div className="text-red-500 text-sm mt-2">
                          {status.error}
                        </div>
                    )}
                  </Form>
              )}
            </Formik>
          </div>
        </main>
        <Footer/>
      </div>
  );
}
