// app/api/login/route.js
import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
  const { email, senha } = await request.json();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const user = userCredential.user;

    // Retorne informações do usuário (exceto a senha)
    return NextResponse.json(
      {
        uid: user.uid,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Erro ao fazer login:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
}
