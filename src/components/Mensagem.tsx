import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const MySwal = withReactContent(Swal);

// Sucesso
export const SucessoAlerta = (
  message: string,
  redirecionar?: string,
  router?: AppRouterInstance
) => {
  MySwal.fire({
    icon: "success",
    title: "Sucesso!",
    text: message,
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed && redirecionar && router) {
      router.push(redirecionar);
    }
  });
};
// Erro
export const ErroAlerta = (message: string, erro?: string) => {
  MySwal.fire({
    icon: "error",
    title: "Erro!",
    text: message,
    footer: erro,
    confirmButtonText: "Tentar novamente",
  });
};

// Timer, Sucesso e Redirecionamento
export const SucessoTimerAlerta = (
  message: string,
  redirecionar: string,
  router: AppRouterInstance
) => {
  MySwal.fire({
    icon: "success",
    title: "Concluído!",
    text: message,
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      router.push(redirecionar);
    },
  });
};

// Confirmação de Exclusão
export const DeletarAlerta = (onConfirm: () => void) => {
  MySwal.fire({
    icon: "warning",
    title: "Você tem certeza?",
    text: "Esta ação não poderá ser desfeita.",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Excluído!", "O item foi removido com sucesso.", "success");
    }
  });
};
