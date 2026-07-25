"use client";

import { useState } from "react";

export default function TopUpPage() {

  const adminWhatsApp = "6283822451226";


  const [username, setUsername] = useState("");
  const [robux, setRobux] = useState(100);
  const [payment, setPayment] = useState("QRIS");

  const [robloxUser, setRobloxUser] = useState<any>(null);

  const [checking, setChecking] = useState(false);
  const [isAdult, setIsAdult] = useState(false);



  const isValid = robux >= 100 && robux % 100 === 0;


  const total = (robux / 100) * 16000;



  const waMessage = encodeURIComponent(
    `Halo Admin BAXIL,

Saya ingin melakukan pembelian Robux.

Akun Tujuan:
${robloxUser?.username || "-"}

Display Name:
${robloxUser?.displayName || "-"}

Nominal:
${robux} RBX

Metode Pembayaran:
${payment}

TOTAL:
Rp${total.toLocaleString("id-ID")}

Verifikasi Umur:
${isAdult ? "✓ Pengguna menyatakan akun 18+" : "Belum Verifikasi"}

Status:
Menunggu Pembayaran

Terima kasih.
`
  );




  async function checkRoblox() {


    if (!username) return;


    setChecking(true);


    try {


      const res = await fetch("/api/roblox", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          username

        })

      });



      const data = await res.json();



      setRobloxUser(data);



    } catch (error) {


      console.log(error);

      setRobloxUser({
        found: false
      });


    } finally {


      setChecking(false);


    }


  }

  async function sendOrder() {

    if (!robloxUser?.found) {
      alert("Cek username Roblox terlebih dahulu");
      return;
    }

    if (!isValid) {
      alert("Jumlah Robux tidak valid");
      return;
    }

    if (!isAdult) {
      alert("Silakan centang verifikasi akun Roblox 18+ terlebih dahulu");
      return;
    }

    try {

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerUsername: robloxUser.username,
          robux,
          price: total,
          payment,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Gagal membuat order");
        return;
      }

      window.open(
        `https://wa.me/${adminWhatsApp}?text=${waMessage}`,
        "_blank"
      );

    } catch (err) {

      console.log(err);
      alert("Server Error");

    }
  }




  return (

    <main className="min-h-screen bg-black text-white">


      {/* HEADER */}

      <div className="border-b border-zinc-800">


        <div className="mx-auto max-w-6xl px-6 py-8">


          <h1 className="text-4xl font-bold">
            BAXIL STORE
          </h1>


          <p className="mt-2 text-zinc-400">
            Top Up Robux Cepat dan Aman
          </p>


        </div>


      </div>






      {/* CONTENT */}

      <div className="mx-auto grid max-w-6xl gap-8 p-6 lg:grid-cols-2">






        {/* FORM */}


        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">



          <h2 className="mb-6 text-2xl font-bold">
            Data Pembelian
          </h2>





          <label className="text-sm text-zinc-400">
            Username Roblox
          </label>



          <input

            type="text"

            value={username}

            onChange={(e) => {

              setUsername(e.target.value);

              setRobloxUser(null);

              setIsAdult(false);

            }}

            placeholder="Masukkan username Roblox"

            className="mt-2 w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none"

          />





          <button

            onClick={checkRoblox}

            className="mt-3 rounded-xl bg-white px-5 py-3 font-bold text-black"

          >

            {
              checking
                ?
                "Memeriksa..."
                :
                "Cek Username"
            }


          </button>







          <label className="mt-6 block text-sm text-zinc-400">

            Jumlah Robux

          </label>




          <input

            type="number"

            min="100"

            step="100"

            value={robux}

            onChange={(e) => setRobux(Number(e.target.value))}

            className="mt-2 w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none"

          />





          <p className="mt-2 text-sm text-zinc-500">

            Minimal 100 RBX dan kelipatan 100.

          </p>





          {!isValid && (

            <p className="mt-2 text-sm text-red-500">

              Jumlah Robux tidak valid.

            </p>

          )}







          <label className="mt-6 block text-sm text-zinc-400">

            Metode Pembayaran

          </label>




          <select

            value={payment}

            onChange={(e) => setPayment(e.target.value)}

            className="mt-2 w-full rounded-xl border border-zinc-700 bg-black p-4"

          >

            <option>QRIS</option>

            <option>DANA</option>

            <option>ShopeePay</option>


          </select>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-zinc-700 bg-black p-4">

            <input
              type="checkbox"
              id="adultVerify"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
              className="mt-1 h-5 w-5 cursor-pointer"
            />

            <label
              htmlFor="adultVerify"
              className="cursor-pointer text-sm text-zinc-300"
            >
              Saya memastikan akun Roblox yang digunakan sudah berusia{" "}
              <strong className="text-white">18+</strong>{" "}
              dan data yang saya berikan benar.
            </label>

          </div>



        </div>









        {/* SUMMARY */}


        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">





          <h2 className="mb-6 text-2xl font-bold">

            Ringkasan Pembayaran

          </h2>






          {/* AVATAR */}



          <div className="mb-8 rounded-xl border border-zinc-800 bg-black p-5">



            <h3 className="mb-4 font-bold">

              Avatar Roblox

            </h3>





            {

              robloxUser?.found ? (


                <div className="text-center">


                  <img

                    src={robloxUser.avatar}

                    alt="Avatar Roblox"

                    className="mx-auto h-32 w-32 rounded-xl"

                  />



                  <p className="mt-3 font-bold">

                    {robloxUser.displayName}

                  </p>




                  <p className="text-sm text-zinc-400">

                    @{robloxUser.username}

                  </p>




                  <p className="mt-2 text-green-400">

                    ✓ Username ditemukan

                  </p>



                </div>




              )


                : robloxUser?.found === false ? (


                  <p className="text-red-400">

                    ✕ Username Roblox tidak ditemukan

                  </p>


                )


                  : (


                    <span className="text-zinc-500">

                      Belum dicek

                    </span>


                  )


            }



          </div>







          <div className="space-y-5">



            <div className="flex justify-between">

              <span className="text-zinc-400">
                Akun Tujuan
              </span>

              <span>
                {robloxUser?.username || "-"}
              </span>

            </div>





            <div className="flex justify-between">

              <span className="text-zinc-400">
                Nominal
              </span>


              <span>
                {robux} RBX
              </span>


            </div>





            <div className="flex justify-between">

              <span className="text-zinc-400">
                Metode
              </span>


              <span>
                {payment}
              </span>


            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">
                Verifikasi
              </span>

              <span className={isAdult ? "text-green-400" : "text-red-400"}>
                {isAdult ? "✓ 18+ Terverifikasi" : "Belum Verifikasi"}
              </span>

            </div>






            <hr className="border-zinc-800" />






            <div className="flex justify-between text-3xl font-bold">


              <span>
                TOTAL
              </span>


              <span>

                Rp{total.toLocaleString("id-ID")}

              </span>



            </div>






            <div className="flex justify-between">


              <span className="text-zinc-400">

                Status

              </span>



              <span className="text-yellow-400">

                Menunggu Pembayaran

              </span>


            </div>




          </div>








          <button
            onClick={sendOrder}
            disabled={!isValid || !robloxUser?.found || !isAdult}
            className={`mt-8 w-full rounded-xl py-4 text-center font-bold transition ${isValid && robloxUser?.found && isAdult
              ? "bg-white text-black hover:opacity-90"
              : "cursor-not-allowed bg-zinc-700 text-zinc-400"
              }`}
          >
            Pesan via WhatsApp
          </button>





        </div>





      </div>




    </main>

  );

}