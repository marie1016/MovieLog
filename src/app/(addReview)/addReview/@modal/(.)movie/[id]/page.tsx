import ReviewForm from "@/components/addReview/ReviewForm";
import ReviewHeader from "@/components/ui/review/ReviewHeader";
import getMovieDetails from "@/lib/api/getMovieDetails";
import ReviewInfo from "@/components/ui/review/ReviewInfo";

export default async function ModalPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const movieDetails = await getMovieDetails(id);
  if (!movieDetails) return null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { poster_path, title, genres, runtime } = movieDetails;

  return (
    <div
      data-modal-root
      className="fixed inset-0 z-10 flex items-end justify-center bg-black/60 sm:items-center"
    >
      <div className="z-20 max-h-[90vh] w-full animate-bottom-up overflow-y-auto rounded-t-2xl bg-white p-7 sm:max-w-lg sm:animate-none sm:rounded-xl sm:p-10">
        <h2 className="text-center text-2xl font-medium">영화 리뷰 등록</h2>
        <div className="mt-10 flex flex-col gap-3">
          <ReviewHeader />
          <ReviewInfo
            posterPath={poster_path}
            title={title}
            genres={genres}
            runtime={runtime}
            variant="modal"
          />
          <ReviewForm
            movieId={id}
            posterPath={poster_path}
            title={title}
            genres={genres}
            runtime={runtime}
          />
        </div>
      </div>
    </div>
  );
}
