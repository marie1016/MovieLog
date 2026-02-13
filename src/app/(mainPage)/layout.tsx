import MainHeader from "@/components/header/MainHeader";
import Image from "next/image";
import Link from "next/link";

export default function MainPageLayout({
  movies,
  reviews,
}: Readonly<{
  movies: React.ReactNode;
  reviews: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto mt-16 max-w-7xl px-5 md:px-10 lg:px-16">
        {movies}
      </div>
      <div className="mt-12 bg-white py-9 md:py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-16">
          {reviews}
        </div>
      </div>
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
