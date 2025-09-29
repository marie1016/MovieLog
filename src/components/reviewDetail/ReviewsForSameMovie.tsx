import { getReviewsForSameMovie } from "@/lib/firebase/getReviewsForSameMovie";
import { getElapsedTime } from "@/lib/utils/getElapsedTime";
import Image from "next/image";
import Link from "next/link";

export default async function ReviewsForSameMovie({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  const reviewsData = await getReviewsForSameMovie(title);

  const filteredReviewsData = reviewsData.filter((review) => review.id !== id);

  if (!filteredReviewsData.length)
    return (
      <div className="py-8 text-center text-lg">
        이 영화에 대한
        <br />
        다른 기록이 아직 없어요.
      </div>
    );

  return (
    <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14">
      {filteredReviewsData.map((review) => (
        <li key={review.id}>
          <div className="mb-3 flex justify-between">
            <span>{review.userName}</span>
            <span className="text-sm text-gray600">
              {getElapsedTime(review.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-[2px] text-gray600">
            <Image
              src="/images/blue-star.svg"
              alt="평점 아이콘"
              width={20}
              height={20}
            />
            <span>{review.voteAverage}</span>
          </div>
          <div className="mt-5 h-20 cursor-pointer hover:underline">
            <Link
              href={`/reviewDetail/${review.id}?title=${title}&genreId=${review.genres[0]?.id}`}
            >
              {review.review}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
