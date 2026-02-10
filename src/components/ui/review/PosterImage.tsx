import { BASE_POSTER_PATH } from "@/lib/constants/basePath";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type PosterImageProps = {
  posterPath: string;
  size: string;
  title: string;
};

export default function PosterImage({
  posterPath,
  size,
  title,
}: PosterImageProps) {
  const fullPosterPath = `${BASE_POSTER_PATH}/w500${posterPath}`;
  const dimensions =
    size === "lg"
      ? ["sm:h-[256px] sm:w-[216px]", "sm:w-[150px] w-[90px]"]
      : ["h-[155px] w-[130px]", "w-[90px]"];

  return (
    <div
      className={clsx(
        dimensions[0],
        "flex h-[155px] w-[130px] shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg",
      )}
    >
      <Link
        href={`/searchReviews/${title}`}
        className={clsx("relative aspect-[0.7] overflow-hidden", dimensions[1])}
      >
        <Image
          src={fullPosterPath}
          alt="영화 포스터"
          sizes="90px"
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </Link>
    </div>
  );
}
