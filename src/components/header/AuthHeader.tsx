import Link from "next/link";

export default function AuthHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
        {children}
      </div>
    </header>
  );
}
