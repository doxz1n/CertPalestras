"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("uid");

        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
        }
    }, [router]);

    if (!token) {
        return null;
    } else {

        return (
            <div className="flex flex-col h-screen justify-between bg-blue-500">
                <Header/>
                <main className="bg-white dark:bg-black flex items-center justify-center flex-grow">
                    <h1> Oi mundo</h1>
                </main>
                <Footer/>
            </div>
        );
    }
}