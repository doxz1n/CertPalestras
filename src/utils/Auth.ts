"use client";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User} from "firebase/auth";
import {useRouter} from "next/navigation";
import {useState} from "react";

export async function CreateAuth(email: string, senha: string) {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
  return userCredential.user.uid;
}

export async function LoginAuth(email:string, senha:string) {
    const router = useRouter();
    const [error, setError] = useState<string|null>(null);
    const auth = getAuth();

    if (!email || !senha) {
        setError("Email e senha sao obrigatorios.");
        return;
    }
    signInWithEmailAndPassword(auth, email, senha).then(
        async (userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("uid", user.uid);
            router.push("/painel");

        }
    ).catch((error) => {
        console.log("Erro de autenticacao", error);
        setError("Falha ao autenticar o usuario, verifique suas credenciais");
    });
}

