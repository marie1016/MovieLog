import ReviewCard from "@/components/addReview/ReviewCard";
import ReviewForm from "@/components/addReview/ReviewForm";
import getMovieDetails from "@/lib/api/getMovieDetails";

export default async function ModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const movieDetails = await getMovieDetails(parseInt(id, 10));
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { poster_path, title, genres, runtime } = movieDetails;

  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-full w-full bg-black/60" />
      <dialog
        className="z-10 mb-14 h-auto w-full rounded-xl p-7 sm:w-[480px] sm:p-14"
        open
      >
        <h2 className="text-center text-2xl font-medium">영화 리뷰 등록</h2>
        <div className="mt-10 flex flex-col gap-3">
          <ReviewCard
            posterPath={poster_path}
            title={title}
            genres={genres}
            runtime={runtime}
          />
          <ReviewForm
            posterPath={poster_path}
            title={title}
            genres={genres}
            runtime={runtime}
          />
        </div>
      </dialog>
    </>
  );
}
