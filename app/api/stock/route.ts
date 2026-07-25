import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

    try {


        const stocks = await prisma.stock.findMany();



        const totalRobux = stocks.reduce(
            (total, item) => total + item.robux,
            0
        );



        return NextResponse.json({

            success: true,

            totalRobux

        });



    } catch (error) {


        console.log(error);


        return NextResponse.json({

            success: false,

            error: "Gagal mengambil stok"

        }, {
            status: 500
        });


    }

}