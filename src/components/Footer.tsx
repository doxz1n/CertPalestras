function Footer() {
  return (
    <footer className="bg-blue-500 py-4 absolute inset-x-0 bottom-0 ">
      <div className="container mx-auto p-4 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} CertPalestras - Sistema de
          Gerenciamento e Emissão de Certificados
        </p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
