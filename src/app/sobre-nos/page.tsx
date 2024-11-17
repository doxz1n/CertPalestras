import React from "react";

function About() {
  return (
    <main className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Nós</h2>
      <p className="text-lg text-gray-700 mb-10">
        Somos uma equipe dedicada a fornecer soluções para a gestão de
        inscrições, validação de presença e emissão de certificados. Nossa
        missão é simplificar esses processos, garantindo eficiência e
        confiabilidade para atender às necessidades de nossos clientes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Henrique Alcici */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-900">
            Henrique Alcici Sanchez
          </h3>
          <p className="text-gray-600 mt-2">Desenvolvedor Fullstack Node.js</p>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://www.linkedin.com/in/henrique-alcici-sanchez/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 12.7h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2.02 3.6 4.64v6.42z" />
              </svg>
            </a>
            <a
              href="https://github.com/doxz1n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.166c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.774.419-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.005-.404 1.023.005 2.048.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576 4.765-1.587 8.2-6.083 8.2-11.383 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Celso Machado */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-900">
            Celso Machado
          </h3>
          <p className="text-gray-600 mt-2">Desenvolvedor Fullstack Node.js</p>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://www.linkedin.com/in/celso-machado-b60ba314b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 12.7h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2.02 3.6 4.64v6.42z" />
              </svg>
            </a>
            <a
              href="https://github.com/Celsozne"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.166c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.774.419-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.005-.404 1.023.005 2.048.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576 4.765-1.587 8.2-6.083 8.2-11.383 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Willian da Silva */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-900">
            Willian da Silva
          </h3>
          <p className="text-gray-600 mt-2">Desenvolvedor Frontend React</p>
          <div className="flex mt-4 space-x-4">
            <a
              href="https://www.linkedin.com/in/willian-da-silva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 12.7h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.69h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2.02 3.6 4.64v6.42z" />
              </svg>
            </a>
            <a
              href="https://github.com/WIll779"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.166c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.774.419-1.305.763-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.982-.399 3.005-.404 1.023.005 2.048.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576 4.765-1.587 8.2-6.083 8.2-11.383 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
