import clsx from "clsx";
import Image from "next/image";

type VoteAverageProps = {
  voteAverage: string | undefined;
  size: "sm" | "lg";
};

export default function VoteAverage({ voteAverage, size }: VoteAverageProps) {
  const dimensions = size === "lg" ? 24 : 20;
  return (
    <div className="flex items-center gap-[2px] text-gray600">
      <Image
        src="/images/blue-star.svg"
        alt="평점 아이콘"
        width={dimensions}
        height={dimensions}
      />
      <span className={clsx(size === "lg" && "text-xl")}>{voteAverage}</span>
    </div>
  );
}
