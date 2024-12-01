import { useRouter } from "next/navigation";

export default function Voltar() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()} // Volta para a página anterior
      className="text-blue-600 flex items-center mb-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      Voltar
    </button>
  );
}
