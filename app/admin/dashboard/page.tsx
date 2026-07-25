"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const login = localStorage.getItem("adminLogin");

        if (login !== "true") {
            router.push("/admin");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    function handleLogout() {
        localStorage.removeItem("adminLogin");
        router.push("/admin");
    }

    // Mencegah flash konten sebelum redirect selesai
    if (!isAuthenticated) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
                <p className="text-zinc-400">Loading dashboard...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black p-8 text-white">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">BAXIL DASHBOARD</h1>
                    <p className="mt-2 text-zinc-400">Admin Management Panel</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-700 active:scale-95"
                >
                    Logout
                </button>
            </div>

            {/* Grid Content */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700">
                    <h2 className="text-xl font-bold">Supplier</h2>
                    <p className="mt-3 text-zinc-400">Kelola akun stok Robux</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700">
                    <h2 className="text-xl font-bold">Stok Robux</h2>
                    <p className="mt-3 text-zinc-400">Tambah dan hapus stok</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700">
                    <h2 className="text-xl font-bold">Order</h2>
                    <p className="mt-3 text-zinc-400">Approve pembayaran</p>
                </div>
            </div>
        </main>
    );
}