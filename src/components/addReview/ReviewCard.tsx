import { Movie } from "@/types/movie";
import Image from "next/image";
import dayjs from "dayjs";
import ReviewForm from "./ReviewForm";

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p";

export default function ReviewCard({ movieDetails }: { movieDetails: Movie }) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { poster_path, title, genres, runtime } = movieDetails;
  const posterPath = `${BASE_POSTER_PATH}/w500${poster_path}`;
  const today = dayjs().format("YYYY.MM.DD");
  return (
    <div className="relative my-10 flex items-start gap-4">
      <div className="flex h-[155px] w-[130px] shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg">
        <div className="relative aspect-[2/3] w-[90px]">
          <Image
            src={posterPath}
            alt="영화 포스터"
            sizes="90px"
            fill
            priority
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <span>{title}</span>
          <span className="text-sm text-gray600">{today}</span>
        </div>
        <div className="flex gap-2 text-gray600">
          {genres.slice(0, 2).map((genre) => (
            <div key={genre.id}>{genre.name}</div>
          ))}
        </div>
        <div className="text-gray600">{runtime}분</div>
        <ReviewForm />
      </div>
    </div>
  );
}
