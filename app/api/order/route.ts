import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const order = await prisma.order.create({
            data: {
                customerUsername: body.customerUsername,
                robux: Number(body.robux),
                price: Number(body.price),
                payment: body.payment,
                status: "Pending",
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
                error: "Gagal membuat order",
            },
            { status: 500 }
        );
    }
}