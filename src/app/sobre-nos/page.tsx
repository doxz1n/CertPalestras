import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function About() {
  return (
    <div>
      <Head>
        <title>Sobre Nós - Sistema de Gerenciamento e Emissão de Certificados</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-3xl mb-4">Sobre Nós</h2>
        <p className="mb-8">
          Somos uma equipe dedicada a fornecer soluções eficazes para gerenciamento e emissão de certificados. Nossa missão é facilitar a administração de certificados de forma segura e eficiente, atendendo às necessidades dos nossos clientes com qualidade e confiabilidade.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-black">Henrique Alcici</h3>
            <p className="mt-2 text-black">Desenvolvedor fullstack Node.js.</p>
            <div className="flex mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/henrique-alcici-sanchez-09390427b/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 12.7h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2.02 3.6 4.64v6.42z"/></svg>
              </a>
              <a href="https://github.com/doxz1n" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.166c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.774.419-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.005-.404 1.023.005 2.048.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576 4.765-1.587 8.2-6.083 8.2-11.383 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-black">Celso Machado</h3>
            <p className="mt-2 text-black">Desenvolvedor fullstack Node.js.</p>
            <div className="flex mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/celso-machado-b60ba314b/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 12.7h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2.02 3.6 4.64v6.42z"/></svg>
              </a>
              <a href="https://github.com/Celsozne" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.166c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.774.419-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.005-.404 1.023.005 2.048.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576 4.765-1.587 8.2-6.083 8.2-11.383 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;

