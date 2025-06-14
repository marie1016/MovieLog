export default function AddReviewLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <div className="mx-auto mt-16 max-w-7xl px-16">{children}</div>
    </>
  );
}
