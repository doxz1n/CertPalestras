import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import { SucessoTimerAlerta, ErroAlerta } from "./Mensagem";

const CPFInputForm: React.FC<{ token: string }> = ({ token }) => {
  const [cpf, setCpf] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cpfSemMascara = cpf.replace(/\D/g, "");

    try {
      const response = await fetch("/api/event/validar-presenca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: cpfSemMascara, token }),
      });

      const data = await response.json();

      if (response.ok) {
        SucessoTimerAlerta("Presença validada com sucesso!", "/", router);
      } else {
        ErroAlerta("Algo deu errado!", data.error);
      }
    } catch (error: any) {
      console.error("Erro ao validar presença:", error);
      ErroAlerta("Erro no servidor", error);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Validar Presença
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">CPF:</label>
          <InputMask
            mask="999.999.999-99" // Máscara para CPF
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            className="mt-1 p-2 block w-full border bg-gray-900 border-gray-700 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Validar Presença
          </button>
        </form>
      </div>
    </div>
  );
};

export default CPFInputForm;
