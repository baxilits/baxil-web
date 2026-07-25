"use client";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function AdminPage() {


    const cookieStore = await cookies();


    const session = cookieStore.get(
        "admin_session"
    );



    if (!session) {

        redirect("/admin/login");

    }


    // kode admin kamu lanjut di bawah


}

import { useEffect, useState } from "react";

export default function AdminPage() {

    const [accountName, setAccountName] = useState("");
    const [username, setUsername] = useState("");
    const [robux, setRobux] = useState<number>(100);

    const [robloxUser, setRobloxUser] = useState<any>(null);

    const [stocks, setStocks] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    const [checking, setChecking] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);

    // =========================
    // CHECK ROBLOX
    // =========================

    async function checkRoblox() {

        if (!username.trim()) {
            alert("Masukkan username Roblox");
            return;
        }

        setChecking(true);

        try {

            const res = await fetch("/api/roblox", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim()
                })
            });

            const data = await res.json();

            setRobloxUser(data);

        } catch (error) {

            console.log(error);

            setRobloxUser({
                found: false
            });

        }

        setChecking(false);

    }

    // =========================
    // GET STOCK
    // =========================

    async function getStocks() {

        try {

            const res = await fetch("/api/admin/stock", {
                cache: "no-store"
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                setStocks(data);
            }

        } catch (error) {

            console.log(error);

        }

    }

    // =========================
    // GET ORDER
    // =========================

    async function getOrders() {

        try {

            const res = await fetch("/api/admin/order", {
                cache: "no-store"
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                setOrders(data);
            }

        } catch (error) {

            console.log(error);

        }

    }

    // =========================
    // ADD STOCK
    // =========================

    async function addStock() {

        if (!robloxUser?.found) {
            alert("Cek username Roblox terlebih dahulu");
            return;
        }

        if (!accountName.trim()) {
            alert("Nama akun supplier kosong");
            return;
        }

        if (robux <= 0) {
            alert("Jumlah RBX tidak valid");
            return;
        }

        setSaving(true);

        try {

            const res = await fetch("/api/admin/stock", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    accountName: accountName.trim(),
                    username: robloxUser.username,
                    robux: Number(robux)

                })

            });

            const data = await res.json();

            if (data.success) {

                alert("Stok berhasil ditambahkan");

                setAccountName("");
                setUsername("");
                setRobux(100);
                setRobloxUser(null);

                await getStocks();

            } else {

                alert(data.error || "Gagal tambah stok");

            }

        } catch (error) {

            console.log(error);

            alert("Server error");

        }

        setSaving(false);

    }

    // =========================
    // DELETE STOCK
    // =========================

    async function deleteStock(id: number) {

        if (!confirm("Yakin ingin menghapus stok ini?")) return;

        setDeleting(id);

        try {

            const res = await fetch(`/api/admin/stock?id=${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.success) {

                alert("Stok berhasil dihapus");

                await getStocks();

            } else {

                alert(data.error);

            }

        } catch (error) {

            console.log(error);

            alert("Server error");

        }

        setDeleting(null);

    }

    // =========================
    // APPROVE ORDER
    // =========================

    async function approveOrder(id: number) {

        if (!confirm("Approve order ini?")) return;

        try {

            const res = await fetch("/api/admin/order/approve", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id
                })

            });

            const data = await res.json();

            if (data.success) {

                alert("Order berhasil di-approve");

                await getOrders();
                await getStocks();

            } else {

                alert(data.error);

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

        }

    }

    async function cancelOrder(id: number) {

        if (!confirm("Yakin ingin membatalkan order ini?")) {
            return;
        }

        try {

            const res = await fetch("/api/admin/order/cancel", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id,
                }),

            });

            const data = await res.json();

            if (data.success) {

                alert("Order berhasil dibatalkan");

                await getOrders();

            } else {

                alert(data.error);

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

        }

    }

    useEffect(() => {

        getStocks();
        getOrders();

    }, []);

    return (

        <main className="min-h-screen bg-black text-white p-8">

            <h1 className="text-4xl font-bold">
                BAXIL ADMIN
            </h1>

            <p className="mt-2 text-zinc-400">
                Management Stok Robux
            </p>

            {/* ========================= */}
            {/* TAMBAH SUPPLIER */}
            {/* ========================= */}

            <div className="mt-10 max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

                <h2 className="mb-6 text-2xl font-bold">
                    Tambah Supplier
                </h2>

                <input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Nama Akun Supplier"
                    className="mb-4 w-full rounded-xl border border-zinc-700 bg-black p-4"
                />

                <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setRobloxUser(null);
                    }}
                    placeholder="Username Roblox Supplier"
                    className="mb-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
                />

                <button
                    onClick={checkRoblox}
                    disabled={checking}
                    className="mb-5 rounded-xl bg-white px-5 py-3 font-bold text-black"
                >
                    {checking ? "Memeriksa..." : "Cek Username Roblox"}
                </button>

                {robloxUser?.found && (

                    <div className="mb-5 rounded-xl border border-green-700 bg-green-950 p-4 text-center">

                        <img
                            src={robloxUser.avatar}
                            alt="avatar"
                            className="mx-auto h-24 w-24 rounded-xl"
                        />

                        <p className="mt-3 font-bold">
                            {robloxUser.displayName}
                        </p>

                        <p className="text-green-400">
                            ✓ Username valid
                        </p>

                    </div>

                )}

                {robloxUser?.found === false && (

                    <p className="mb-5 text-red-400">
                        ✕ Username Roblox tidak ditemukan
                    </p>

                )}

                <input
                    type="number"
                    min={1}
                    value={robux}
                    onChange={(e) => setRobux(Number(e.target.value))}
                    className="mb-5 w-full rounded-xl border border-zinc-700 bg-black p-4"
                />

                <button
                    onClick={addStock}
                    disabled={saving}
                    className="w-full rounded-xl bg-white py-4 font-bold text-black"
                >
                    {saving ? "Menyimpan..." : "Tambah Stok"}
                </button>

            </div>

            {/* ========================= */}
            {/* DAFTAR SUPPLIER */}
            {/* ========================= */}

            <div className="mt-12">

                <h2 className="mb-5 text-2xl font-bold">
                    Daftar Supplier
                </h2>

                {stocks.length === 0 ? (

                    <p className="text-zinc-500">
                        Belum ada stok
                    </p>

                ) : (

                    <div className="space-y-4">

                        {stocks.map((item) => (

                            <div
                                key={item.id}
                                className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                            >

                                <p className="text-lg font-bold">
                                    {item.accountName}
                                </p>

                                <p className="text-zinc-400">
                                    @{item.username}
                                </p>

                                <p className="mt-3 font-bold text-green-400">
                                    {item.robux.toLocaleString("id-ID")} RBX
                                </p>

                                <button
                                    onClick={() => deleteStock(item.id)}
                                    disabled={deleting === item.id}
                                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-bold"
                                >
                                    {deleting === item.id
                                        ? "Menghapus..."
                                        : "Hapus"}
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* ========================= */}
            {/* ORDER MASUK */}
            {/* ========================= */}

            <div className="mt-16">

                <h2 className="mb-6 text-3xl font-bold">
                    Order Masuk
                </h2>

                {orders.length === 0 ? (

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">
                        Belum ada order.
                    </div>

                ) : (

                    <div className="overflow-x-auto rounded-xl border border-zinc-800">

                        <table className="w-full">

                            <thead className="bg-zinc-900">

                                <tr>

                                    <th className="p-4 text-left">
                                        Username
                                    </th>

                                    <th className="p-4 text-left">
                                        Robux
                                    </th>

                                    <th className="p-4 text-left">
                                        Harga
                                    </th>

                                    <th className="p-4 text-left">
                                        Pembayaran
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                    <th className="p-4 text-left">
                                        Tanggal
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {orders.map((order) => (

                                    <tr
                                        key={order.id}
                                        className="border-t border-zinc-800"
                                    >

                                        <td className="p-4">
                                            @{order.customerUsername}
                                        </td>

                                        <td className="p-4">
                                            {order.robux.toLocaleString("id-ID")} RBX
                                        </td>

                                        <td className="p-4">
                                            Rp{order.price.toLocaleString("id-ID")}
                                        </td>

                                        <td className="p-4">
                                            {order.payment}
                                        </td>

                                        <td className="p-4">

                                            <div className="flex flex-col gap-3">

                                                <span
                                                    className={`w-fit rounded-full px-3 py-1 text-sm ${order.status === "Success"
                                                        ? "bg-green-600"
                                                        : order.status === "Cancelled"
                                                            ? "bg-red-600"
                                                            : "bg-yellow-600"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>

                                                {order.status === "Pending" && (

                                                    <div className="flex gap-2">

                                                        <button
                                                            onClick={() => approveOrder(order.id)}
                                                            className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            onClick={() => cancelOrder(order.id)}
                                                            className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </td>

                                        <td className="p-4">
                                            {new Date(order.createdAt).toLocaleString("id-ID")}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </main>

    );

}