import EventosFuturos from "@/components/EventosFuturos";

function Home() {
  return (
    <main className="container mx-auto p-6">
      {/* Cabeçalho */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-blue-600">
          Bem-vindo ao CertPalestras!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Gerencie e emita certificados de forma fácil e segura.
        </p>
      </header>

      {/* Seção de Descrição */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold">O que oferecemos</h2>
        <p className="mt-2 text-gray-600">
          Nossa plataforma oferece uma solução simples e eficaz para gerenciar a
          inscrição, validar a presença e emitir certificados para participantes
          em eventos.
        </p>
      </section>

      {/* Seção de Eventos Futuros */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Eventos Futuros</h2>
        <EventosFuturos />
      </section>
    </main>
  );
}

export default Home;
