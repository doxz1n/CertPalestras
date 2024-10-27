"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 py-6 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image
              className="h-16 w-16 sm:h-20 sm:w-20 transition-transform hover:scale-105"
              src={Logo}
              alt="Logo CertPalestras"
              width={80}
              height={80}
            />
          </Link>
        </div>
        {/* Menu para telas maiores */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Início
          </Link>
          <Link
            href="/sobre-nos"
            className="text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Sobre Nós
          </Link>
          <Link
            href="/login"
            className="text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Login Coordenadores
          </Link>
        </nav>
        {/* Ícone de menu para telas menores */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
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
      </div>

      {/* Menu para telas menores */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 space-y-4 p-4">
          <Link
            href="/"
            className="block text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Início
          </Link>
          <Link
            href="/sobre-nos"
            className="block text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Sobre Nós
          </Link>
          <Link
            href="/login"
            className="block text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Login Coordenadores
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
