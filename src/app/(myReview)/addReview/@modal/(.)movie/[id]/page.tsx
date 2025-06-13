import ReviewCard from "@/components/addReview/ReviewCard";
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
      <dialog className="z-10 h-[750px] w-[480px] rounded-xl px-14 py-7" open>
        <h2 className="text-center text-2xl font-medium">영화 리뷰 등록</h2>
        <ReviewCard movieDetails={movieDetails} />
      </dialog>
    </>
  );
}
