import EventosFuturos from "@/components/EventosFuturos";

function Home() {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-3xl">Bem-vindo ao nosso sistema!</h2>
      <p>
        Aqui você pode gerenciar e emitir certificados de forma fácil e segura.
      </p>
      <EventosFuturos />
    </main>
  );
}

export default Home;
