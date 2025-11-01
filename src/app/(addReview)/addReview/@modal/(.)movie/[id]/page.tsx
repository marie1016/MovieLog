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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { poster_path, title, genres, runtime } = movieDetails!;

  return (
    <>
      <div className="fixed inset-0 z-10 h-screen w-screen bg-black/60" />
      <dialog
        className="fixed inset-0 z-20 mt-20 h-auto w-full overflow-y-scroll rounded-xl p-7 sm:mb-14 sm:w-[480px] sm:p-14"
        open
      >
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
      </dialog>
    </>
  );
}
