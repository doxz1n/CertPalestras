import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Sistema de Gerenciamento e Emissão de Certificados</title>
        </Head>
        <Header />
        <main className="container mx-auto p-4">
          <h2 className="text-3xl">Bem-vindo ao nosso sistema!</h2>
          <p>
            Aqui você pode gerenciar e emitir certificados de forma fácil e
            segura.
          </p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Começar
          </button>
        </main>
        <Footer />
      </Layout>
    </>
  );
}

export default Home;
