import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



// =========================
// AMBIL SEMUA STOCK
// =========================

export async function GET() {

    try {


        const stocks = await prisma.stock.findMany({

            orderBy: {

                createdAt: "desc"

            }

        });



        return NextResponse.json(stocks);



    } catch (error) {


        console.log(error);


        return NextResponse.json(

            {
                success: false,
                error: "Gagal mengambil stok"
            },

            {
                status: 500
            }

        );


    }

}






// =========================
// TAMBAH STOCK
// =========================


export async function POST(
    req: Request
) {


    try {


        const body = await req.json();



        if (
            !body.accountName ||
            !body.username ||
            !body.robux
        ) {


            return NextResponse.json({

                success: false,

                error: "Data belum lengkap"

            });


        }




        const stock = await prisma.stock.create({


            data: {


                accountName: String(body.accountName),


                username: String(body.username),


                robux: Number(body.robux)


            }


        });





        return NextResponse.json({

            success: true,

            data: stock


        });





    } catch (error) {


        console.log(error);


        return NextResponse.json({

            success: false,

            error: "Gagal menambah stok"


        },
            {
                status: 500
            });



    }


}








// =========================
// HAPUS STOCK
// =========================


export async function DELETE(
    req: Request
) {


    try {


        const { searchParams } = new URL(req.url);



        const id = searchParams.get("id");




        if (!id) {


            return NextResponse.json({

                success: false,

                error: "ID tidak ditemukan"


            });


        }





        await prisma.stock.delete({

            where: {


                id: Number(id)


            }


        });






        return NextResponse.json({

            success: true,

            message: "Stock berhasil dihapus"


        });






    } catch (error) {


        console.log(error);



        return NextResponse.json({

            success: false,

            error: "Gagal menghapus stock"


        },
            {

                status: 500

            });



    }


}