"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminLogin() {


    const router = useRouter();

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");



    async function login() {


        const res = await fetch(
            "/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            }
        );



        const data = await res.json();



        if (data.success) {

            router.push("/admin");

        }
        else {

            setError(data.error);

        }


    }



    return (

        <main className="min-h-screen bg-black text-white flex items-center justify-center">


            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">


                <h1 className="text-3xl font-bold mb-6">
                    BAXIL ADMIN
                </h1>


                <input

                    type="password"

                    placeholder="Password Admin"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    className="w-full rounded-xl border border-zinc-700 bg-black p-4"

                />



                {
                    error &&

                    <p className="mt-3 text-red-400">
                        {error}
                    </p>

                }



                <button

                    onClick={login}

                    className="mt-5 w-full rounded-xl bg-white py-4 font-bold text-black"

                >

                    Login

                </button>


            </div>


        </main>

    )

}