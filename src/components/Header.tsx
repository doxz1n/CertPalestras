import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

function Header() {
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
            href="/contato"
            className="text-white font-semibold hover:text-gray-200 transition-colors"
          >
            Contato
          </Link>
          <Link
            href="/criar-evento"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Criar Evento
          </Link>
        </nav>
        <div className="md:hidden">
          {/* Ícone de menu para telas menores */}
          <button className="text-white">
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
    </header>
  );
}

export default Header;
