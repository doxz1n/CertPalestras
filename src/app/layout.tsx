import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CertPalestras",
  description: "CertPalestras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-black min-h-screen flex flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
