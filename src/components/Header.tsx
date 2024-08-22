import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
function Header() {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image
              className="h-20	w-20"
              width={0}
              height={0}
              src={Logo}
              alt="Logo"
            ></Image>
          </Link>
        </div>
        <nav className="flex justify-end">
          <ul className="flex justify-end">
            <li className="mr-4">
              <Link href="/" className="text-white hover:text-gray-200">
                Início
              </Link>
            </li>
            <li className="mr-4">
              <Link
                href="/sobre-nos"
                className="text-white hover:text-gray-200"
              >
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-white hover:text-gray-200">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
