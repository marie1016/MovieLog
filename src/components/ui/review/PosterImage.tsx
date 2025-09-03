import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import clsx from "clsx";
import Image from "next/image";

type PosterImageProps = {
  posterPath: string;
  size: string;
};

export default function PosterImage({ posterPath, size }: PosterImageProps) {
  const fullPosterPath = `${BASE_POSTER_PATH}/w500${posterPath}`;
  const dimensions =
    size === "lg"
      ? ["sm:h-[256px] sm:w-[216px]", "sm:w-[150px]"]
      : ["h-[155px] w-[130px]", "w-[90px]"];

  return (
    <div
      className={clsx(
        dimensions[0],
        "flex h-[155px] w-[130px] shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg",
      )}
    >
      <div className={clsx("relative aspect-[2/3] w-[90px]", dimensions[1])}>
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
