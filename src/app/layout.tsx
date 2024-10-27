import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CertPalestras",
  description: "CertPalestras - Plataforma para Certificação de Eventos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 md:px-8 py-8 sm:py-12 max-w-screen-lg">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
