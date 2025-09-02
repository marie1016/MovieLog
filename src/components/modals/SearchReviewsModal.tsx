import SearchReviews from "../header/SearchReviews";

export default function SearchReviewsModal() {
  return (
    <div className="fixed inset-0 z-10 mx-auto w-full bg-white px-6 py-8">
      <SearchReviews width="max-w-[764px] w-full" />
    </div>
  );
}
