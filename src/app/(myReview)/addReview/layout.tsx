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
      <div className="mx-auto my-16 w-72 max-w-7xl sm:w-full sm:px-16">
        {children}
      </div>
    </>
  );
}
