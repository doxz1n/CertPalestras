// app/api/login/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
	const { email, senha } = await request.json();
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, senha);
		const user = userCredential.user;

		// Retorne informações do usuário (exceto a senha)
		return NextResponse.json(
		{	uid: user.uid,
			email: user.email,
		},
			{ status: 200 }
		);
	} catch (error: any) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('Erro:', errorCode, errorMessage);

		// Definir variáveis responseMessage e statusCode

		let responseMessage = 'Ocorreu um erro inesperado.'; // Mensagem padrão
		let statusCode = 400; // Código padrão para erros conhecidos

		switch (errorCode) {
			case 'auth/email-already-in-use':
				responseMessage = 'Este e-mail já está em uso.';
				break;
			case 'auth/invalid-email':
				responseMessage = 'O formato do e-mail é inválido.';
				break;
			case 'auth/operation-not-allowed':
				responseMessage = 'O método de autenticação não está habilitado.';
				break;
			case 'auth/weak-password':
				responseMessage = 'A senha é muito fraca.';
				break;
			case 'auth/invalid-credential':
				responseMessage = 'As credenciais fornecidas são inválidas.';
				break;
			default:
				statusCode = 500; // Erros inesperados retornam status 500
		}

		// Retornar a resposta com o código de erro
		return NextResponse.json({ error: responseMessage }, { status: statusCode });
  }
}
	



