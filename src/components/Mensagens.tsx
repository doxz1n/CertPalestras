function Sucesso(mensagem: any) {
  return (
    <div className="mt-4 p-2 border-l-4 bg-green-100 border-green-500 text-green-900">
      <h2 className="text-lg font-bold">{mensagem}</h2>
    </div>
  );
}

function Erro(mensagem: any) {
  return (
    <div className="mt-4 p-2 border-l-4 bg-red-100 border-red-500 text-red-900">
      <h2 className="text-lg font-bold">{mensagem}</h2>
    </div>
  );
}

export { Sucesso, Erro };
