export default function DropdownItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li className="text-base font-semibold">{children}</li>;
}
