import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-black px-6 text-center text-white">

      <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
        Premium Robux Store
      </span>

      <h1 className="mt-8 text-6xl font-bold">
        Top Up Robux
      </h1>

      <p className="mt-6 max-w-xl text-zinc-400">
        Aman • Cepat • Terpercaya
      </p>

      <Link
        href="/topup"
        className="mt-10 rounded-xl bg-white px-8 py-4 font-bold text-black"
      >
        Mulai Top Up
      </Link>

    </section>
  );
}