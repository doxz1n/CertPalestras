"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// Layout de navegação e estrutura do painel
export default function PainelLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna a visibilidade do menu
  };

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
          <div className="text-xl sm:text-2xl font-semibold">
            Painel de Controle
          </div>

          {/* Menu hamburguer para telas móveis */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Menu normal para telas maiores */}
          <ul className="hidden md:flex space-x-4 sm:space-x-6">
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

        {/* Dropdown menu para telas móveis */}
        {isMenuOpen && (
          <ul className="md:hidden bg-blue-900 text-white p-4 space-y-4">
            <li>
              <Link
                href="/painel/consulta-eventos"
                className="block hover:text-blue-300"
              >
                Consulta de Eventos
              </Link>
            </li>
            <li>
              <Link
                href="/painel/criar-evento"
                className="block hover:text-blue-300"
              >
                Criar Evento
              </Link>
            </li>
            <li>
              <Link
                href="/painel/inserir-presenca"
                className="block hover:text-blue-300"
              >
                Inserir Presença Manual
              </Link>
            </li>
            <li>
              <Link
                href="/painel/emitir-certificados"
                className="block hover:text-blue-300"
              >
                Emitir Certificados
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                onClick={() => localStorage.removeItem("uid")}
                className="block hover:text-blue-300"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
