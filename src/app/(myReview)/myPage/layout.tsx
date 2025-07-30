export default function MyPageLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <div className="mx-auto max-w-4xl">{children}</div>
    </>
  );
}
