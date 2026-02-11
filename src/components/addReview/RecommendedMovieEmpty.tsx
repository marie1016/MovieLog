export default function RecommendedMovieEmpty() {
  return (
    <div className="my-6 max-w-[490px] rounded-xl bg-white py-16 text-center sm:max-w-7xl">
      <div className="mb-6">
        <p className="text-lg">아직 작성하신 리뷰가 없습니다.</p>
        <p className="text-lg text-gray600">
          리뷰를 작성하면 취향에 맞는 영화를 추천해드립니다.
        </p>
      </div>
      <div>
        <p>[리뷰 작성 방법]</p>
        <p>영화 검색 → 영화 포스터 클릭</p>
      </div>
    </div>
  );
}
