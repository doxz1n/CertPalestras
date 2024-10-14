"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const LoginTeacher: React.FC = () => {
  const router = useRouter();

  // Schema de validação com Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .required("O campo email é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("O campo senha é obrigatório"),
  });

  // Valores iniciais do formulário
  const initialValues = {
    email: "",
    senha: "",
  };

  // Função de submit do formulário
  const login = async (
    values: { email: string; senha: string },
    { setStatus, setSubmitting }: any
  ) => {
    const { email, senha } = values;
    try {
      const response = await fetch("/api/coordinator/sign-on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const userData = await response.json();

      if (!response.ok) {
        setStatus({ error: userData.error || "Erro desconhecido" });
      } else {
        localStorage.setItem("uid", userData.uid);
        router.push("/painel");
      }
    } catch (error) {
      setStatus({ error: "Erro ao tentar se conectar ao servidor" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex justify-center items-center p-4 ">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          {({ isSubmitting, status }) => (
            <Form>
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
                  aria-label="Email"
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
                  className="block text-sm font-medium text-gray-300"
                >
                  Senha
                </label>
                <Field
                  name="senha"
                  type="password"
                  className="mt-1 text-white block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Senha"
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Login"}
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

export default LoginTeacher;
