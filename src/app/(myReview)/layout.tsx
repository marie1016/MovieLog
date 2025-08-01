import MainHeader from "@/components/MainHeader";

export default function MyReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto mt-16 px-5 md:px-16 lg:max-w-7xl">{children}</div>
    </>
  );
}
