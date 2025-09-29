import Image from "next/image";

type VoteAverageProps = {
  voteAverage: string | undefined;
  size: string;
  variant?: string;
  color?: "blue" | "yellow";
};

export default function VoteAverage({
  voteAverage,
  size,
  variant,
  color = "blue",
}: VoteAverageProps) {
  const dimensions = size === "lg" ? 24 : 20;
  const src = color === "blue" ? "/images/blue-star.svg" : "/images/star.svg";
  const text = size === "lg" ? "text-base" : "text-sm";

  if (variant === "modal") return null;

  return (
    <div className="flex items-center justify-center gap-[2px] text-gray600">
      <Image
        src={src}
        alt="평점 아이콘"
        width={dimensions}
        height={dimensions}
      />
      <span className={text}>{voteAverage}</span>
    </div>
  );
}
