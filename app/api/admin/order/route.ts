import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ======================
// GET semua order
// ======================

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Gagal mengambil order",
            },
            {
                status: 500,
            }
        );
    }
}

// ======================
// Update Status Order
// ======================

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();

        const order = await prisma.order.update({
            where: {
                id: Number(body.id),
            },
            data: {
                status: body.status,
            },
        });

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}

// ======================
// Hapus Order
// ======================

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        await prisma.order.delete({
            where: {
                id: Number(body.id),
            },
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}