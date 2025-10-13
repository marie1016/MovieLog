"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="h-[60px] w-full bg-white shadow-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16">
        <Link
          href="/"
          className="font-jetBrainsMono text-2xl"
          onClick={handleClick}
        >
          MovieLog
        </Link>
        {children}
      </div>
    </header>
  );
}
