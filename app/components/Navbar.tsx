import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold tracking-widest"
        >
          BAXIL
        </Link>

        <nav className="hidden gap-8 md:flex text-zinc-300">

          <Link href="/">Home</Link>

          <Link href="/topup">Top Up</Link>

          <Link href="/harga">Harga</Link>

          <Link href="/faq">FAQ</Link>

        </nav>

      </div>
    </header>
  );
}