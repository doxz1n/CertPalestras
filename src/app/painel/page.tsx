"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const isAuthenticated = () => {
  const uid = localStorage.getItem("uid");
  return !!uid;
};

const Painel: React.FC = () => {
  const router = useRouter();

  // Redireciona para login se não autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="flex-grow container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Bem-vindo ao Painel de Controle
        </h1>
        <p className="text-gray-700 text-lg">
          Utilize o menu acima para navegar entre as opções de gestão do
          sistema. Aqui você pode consultar eventos, criar novos eventos,
          inserir presença manualmente e emitir certificados.
        </p>
      </div>
    </main>
  );
};

export default Painel;
