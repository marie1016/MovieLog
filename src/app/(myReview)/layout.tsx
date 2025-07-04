import MainHeader from "@/components/MainHeader";

export default function MyReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto mt-16 max-w-7xl px-5 md:w-[650px] md:px-0 lg:w-[800px]">
        {children}
      </div>
    </>
  );
}
