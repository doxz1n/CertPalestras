"use client";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../lib/firebase";

export async function CreateAuth(email: string, senha: string) {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
  return userCredential.user.uid;
}
