import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {

    try {

        const { id } = await req.json();

        const order = await prisma.order.findUnique({
            where: {
                id,
            },
        });

        if (!order) {
            return NextResponse.json({
                success: false,
                error: "Order tidak ditemukan",
            });
        }

        if (order.status !== "Pending") {
            return NextResponse.json({
                success: false,
                error: "Order sudah diproses",
            });
        }

        await prisma.order.update({
            where: {
                id,
            },
            data: {
                status: "Cancelled",
            },
        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                error: "Server Error",
            },
            {
                status: 500,
            }
        );

    }

}