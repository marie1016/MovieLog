import AuthHeader from "@/components/AuthHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
}
