import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from 'react';

//esqueleto base, alteracoes necessarias

export default function Contato() {

  return (
      <div className="flex flex-col h-screen justify-between bg-blue-500">
        <Header/>

        <main className="flex-grow flex items-center justify-center">
          <div className="bg-black text-white p-8 rounded-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-6">Entre em Contato</h1>
            <form >
              <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium">
                  Nome
                </label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                    required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                    required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mensagem" className="block text-sm font-medium">
                  Mensagem
                </label>
                <textarea
                    name="mensagem"
                    id="mensagem"
                    className="mt-1 p-2 block w-full bg-gray-800 border border-gray-700 rounded-md"
                    required
                ></textarea>
              </div>
              <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Enviar
              </button>
            </form>
          </div>
        </main>
        <Footer/>
      </div>
  );
}
