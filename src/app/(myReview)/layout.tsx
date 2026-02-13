import MainHeader from "@/components/header/MainHeader";
import Image from "next/image";
import Link from "next/link";

export default function MyReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto my-16 px-5 md:px-16 lg:max-w-7xl">{children}</div>
      <Link
        href="/addReview"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12"
        prefetch={false}
      >
        <Image
          src="/images/plus-circle-gray.svg"
          alt="addReview"
          width={60}
          height={60}
        />
      </Link>
    </>
  );
}
