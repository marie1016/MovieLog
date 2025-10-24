import MainHeader from "@/components/header/MainHeader";

export default function AddReviewLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="mx-auto my-16 px-5 md:px-16 lg:max-w-7xl">
        {modal}
        {children}
      </div>
    </>
  );
}
