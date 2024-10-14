"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Layout de navegação e estrutura do painel
export default function PainelLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se o UID está salvo no localStorage
    const uid = localStorage.getItem("uid");

    if (!uid) {
      // Se não houver UID, redireciona para a página de login
      router.push("/login");
    } else {
      // Se houver UID, permite que a página seja carregada
      setLoading(false);
    }
  }, [router]);

  // Enquanto o loading estiver ativo, não renderiza o conteúdo
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 rounded-lg">
      {/* Navbar */}
      <header className="bg-blue-900 text-white rounded-lg">
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-semibold">Painel de Controle</div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/painel/consulta-eventos"
                className="hover:text-blue-300"
              >
                Consulta de Eventos
              </Link>
            </li>
            <li>
              <Link href="/painel/criar-evento" className="hover:text-blue-300">
                Criar Evento
              </Link>
            </li>
            <li>
              <Link
                href="/painel/inserir-presenca"
                className="hover:text-blue-300"
              >
                Inserir Presença Manual
              </Link>
            </li>
            <li>
              <Link
                href="/painel/emitir-certificados"
                className="hover:text-blue-300"
              >
                Emitir Certificados
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                onClick={() => localStorage.removeItem("uid")}
                className="hover:text-blue-300"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto p-6">{children}</main>
    </div>
  );
}
