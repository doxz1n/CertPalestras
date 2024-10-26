function Footer() {
  return (
    <footer className="bg-blue-800 py-6">
      <div className="container mx-auto px-4 md:px-8 text-center text-white">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} CertPalestras - Sistema de
          Gerenciamento e Emissão de Certificados
        </p>
        <p className="text-xs sm:text-sm mt-2">Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
