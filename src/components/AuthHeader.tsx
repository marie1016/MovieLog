import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
      </div>
    </header>
  );
}
