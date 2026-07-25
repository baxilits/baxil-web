"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        if (!password) {
            setError("Masukkan password admin");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("adminLogin", "true");
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Password salah");
            }
        } catch (err) {
            console.error(err);
            setError("Server error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
                <h1 className="mb-2 text-3xl font-bold">BAXIL ADMIN</h1>
                <p className="mb-6 text-zinc-400">Login panel administrator</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Password Admin"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError("");
                            }}
                            className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-zinc-500 transition"
                        />
                        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-white py-4 font-bold text-black transition hover:bg-zinc-200 disabled:opacity-50"
                    >
                        {loading ? "Checking..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
}