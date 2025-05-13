import Link from "next/link";

export default function AuthHeader() {
  return (
    <div className="h-[60px] bg-white">
      <div className="flex h-full w-full items-center justify-between px-[320px]">
        <Link href="/" className="font-jetBrainsMono text-2xl">
          MovieLog
        </Link>
      </div>
    </div>
  );
}
