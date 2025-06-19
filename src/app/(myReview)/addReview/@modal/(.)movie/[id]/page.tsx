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

  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-full w-full bg-black/60" />
      <dialog
        className="z-10 mb-14 h-auto w-full rounded-xl p-7 sm:w-[480px] sm:p-14"
        open
      >
        <h2 className="text-center text-2xl font-medium">영화 리뷰 등록</h2>
        <div className="flex flex-col gap-3">
          <ReviewCard movieDetails={movieDetails} />
          <ReviewForm />
        </div>
      </dialog>
    </>
  );
}
