export default function ModalPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <dialog open>{id}</dialog>;
}
