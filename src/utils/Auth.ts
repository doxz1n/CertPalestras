import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export async function CreateAuth(email: string, senha: string) {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
  return userCredential.user.uid;
}
