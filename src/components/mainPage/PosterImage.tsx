import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import clsx from "clsx";
import Image from "next/image";

type PosterImageProps = {
  posterPath: string;
  size: "sm" | "lg";
};

export default function PosterImage({ posterPath, size }: PosterImageProps) {
  const fullPosterPath = `${BASE_POSTER_PATH}/w500${posterPath}`;
  const dimensions =
    size === "lg"
      ? ["h-[256px] w-[216px]", "w-[150px]"]
      : ["h-[155px] w-[130px]", "w-[90px]"];

  return (
    <div
      className={clsx(
        dimensions[0],
        "flex shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg",
      )}
    >
      <div className={clsx("relative aspect-[2/3]", dimensions[1])}>
        <Image
          src={fullPosterPath}
          alt="영화 포스터"
          sizes="90px"
          fill
          priority
        />
      </div>
    </div>
  );
}
