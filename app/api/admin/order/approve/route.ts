import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const order = await prisma.order.findUnique({
            where: {
                id: Number(body.id),
            },
        });

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order tidak ditemukan" },
                { status: 404 }
            );
        }

        if (order.status === "Success") {
            return NextResponse.json({
                success: false,
                error: "Order sudah diproses",
            });
        }

        // Cari stok terbesar
        const stock = await prisma.stock.findFirst({
            orderBy: {
                robux: "desc",
            },
        });

        if (!stock) {
            return NextResponse.json({
                success: false,
                error: "Stock kosong",
            });
        }

        if (stock.robux < order.robux) {
            return NextResponse.json({
                success: false,
                error: "Stock tidak cukup",
            });
        }

        // Kurangi stok
        await prisma.stock.update({
            where: {
                id: stock.id,
            },
            data: {
                robux: stock.robux - order.robux,
            },
        });

        // Approve order
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: "Success",
            },
        });

        return NextResponse.json({
            success: true,
        });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                success: false,
                error: "Server Error",
            },
            { status: 500 }
        );
    }
}