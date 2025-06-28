import MainHeader from "@/components/MainHeader";

export default function MyReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto mt-16 max-w-7xl px-5 md:px-10 lg:px-40">
        {children}
      </div>
    </>
  );
}
