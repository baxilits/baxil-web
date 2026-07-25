"use client";

import { useEffect, useState } from "react";


export default function StockInfo() {


    const [stock, setStock] = useState(0);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        async function getStock() {


            try {


                const res = await fetch("/api/stock", {

                    cache: "no-store"

                });



                const data = await res.json();



                if (data.success) {

                    setStock(data.totalRobux);

                }



            } catch (error) {


                console.log(
                    "STOCK ERROR",
                    error
                );


            }



            setLoading(false);


        }



        getStock();



    }, []);





    return (

        <section className="px-8 py-5">


            <div className="mx-auto max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6">


                <h2 className="text-xl font-bold">

                    🔥 Stock Robux Baxil

                </h2>



                {
                    loading ? (


                        <p className="mt-3 text-zinc-400">
                            Mengecek stock...
                        </p>


                    ) : (


                        <>

                            <p className="mt-3 text-3xl font-bold text-green-400">

                                {stock.toLocaleString("id-ID")} RBX

                            </p>



                            {
                                stock > 0 ? (

                                    <p className="mt-2 text-green-400">
                                        🟢 Ready Stock
                                    </p>

                                ) : (

                                    <p className="mt-2 text-red-400">
                                        🔴 Stock Habis
                                    </p>

                                )
                            }


                        </>


                    )
                }



            </div>


        </section>

    );


}