import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  const buttonClass = twMerge(
    "w-[460px] h-12 rounded-lg text-white cursor-pointer",
    className,
  );
  return (
    <button type="button" className={buttonClass} {...props}>
      <span className="text-text-white">{children}</span>
    </button>
  );
}
