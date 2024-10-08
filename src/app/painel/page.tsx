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

	const handleLogout = () => {
		localStorage.removeItem("uid");
		router.push("/login");
	};

    if (!token) {
        return null;
    } else {

        return (
            <div className="flex flex-col h-screen justify-between bg-blue-500">
                <Header/>
                <main className="bg-white dark:bg-black flex items-center justify-center flex-grow">
			<button
				onClick = {handleLogout}
				className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
				Logout
			</button>
                </main>
                <Footer/>
            </div>
        );
    }
}
