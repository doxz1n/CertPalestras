import { db } from "@/../lib/firebase";
import {LoginAuth } from "@/utils/Auth";
import coordenadorSchema from "@/utils/coordenadorSchema";
import {Coordenador} from "@/utils/userSchema";
import { getDocs, query, where, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import * as Yup from "yup";

//Formatar código
export async function POST (request: Request) {
    try {
      const body = await request.json();
  
        const uid = await  LoginAuth(body.email, body.senha);
        
        const coordenadorCollection = collection(db, "coordenadores")
        const q = query(coordenadorCollection, where ("uid", "==", uid) );
  
        const coordenadorDoc = await getDocs(q);
        return NextResponse.json(
            {message: "Login realizado com sucesso!" },
            { status: 200 }
        );

      } catch (error){
      if(error instanceof Yup.ValidationError){
        return NextResponse.json({error: error.errors}, { status: 400 });
      }else{
      console.error("Erro ao autenticar o usuario", error);
      return NextResponse.json(
          {error: "Erro ao autenticar o usuario, verifique suas credenciais"},
          { status: 401 }
      );}
    }
  }