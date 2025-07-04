import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { getElapsedTime } from "@/lib/utils/getElapsedTime";
import { changeCreatedAtToDate } from "@/lib/utils/changeCreatedAtToDate";
import Image from "next/image";
import Link from "next/link";

export default async function ReviewsForSameMovie({
  title,
}: {
  title: string;
}) {
  const reviewsForSameMovie = await getReviewsForSameMovie(title);

  return (
    <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
      {reviewsForSameMovie.reviewsData.map((r) => (
        <li key={r.id}>
          <div className="mb-3 flex justify-between">
            <span>{r.userName}</span>
            <span className="text-sm text-gray600">
              {getElapsedTime(changeCreatedAtToDate(r.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-[2px] text-gray600">
            <Image
              src="/images/blue-star.svg"
              alt="평점 아이콘"
              width={20}
              height={20}
            />
            <span>{r.voteAverage}</span>
          </div>
          <div className="mt-5 h-20 cursor-pointer hover:underline">
            <Link
              href={`/reviewDetail/${r.id}?title=${title}&genreId=${r.genres[0]?.id}`}
            >
              {r.review}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
