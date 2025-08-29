import { deleteReview } from "@/lib/firebase/deleteReview";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { ReviewPage } from "@/lib/firebase/getReviews";
import Button from "../ui/button";

export default function DeleteReviewModal({
  id,
  closeDeleteModal,
}: {
  id: string | undefined;
  closeDeleteModal: () => void;
}) {
  const queryClient = useQueryClient();
  const deleteReviewModal = async () => {
    if (id) {
      await deleteReview(id);

      queryClient.setQueryData(
        ["reviews"],
        (oldData: InfiniteData<ReviewPage>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              reviewsData: page.reviewsData.filter(
                (reviewData) => reviewData.id !== id,
              ),
            })),
          };
        },
      );
    }

    queryClient.invalidateQueries({ queryKey: ["reviews"] });
    queryClient.invalidateQueries({ queryKey: ["myReviews"] });

    closeDeleteModal();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 h-screen w-screen bg-black/60" />
      <dialog
        className="fixed inset-0 z-20 mx-auto h-40 w-72 rounded-xl bg-white p-7"
        open
      >
        <h2 className="text-center text-xl font-medium">
          이 리뷰를 삭제하겠습니까?
        </h2>
        <div className="mt-10 flex justify-between">
          <Button className="h-10 w-28 bg-black" onClick={closeDeleteModal}>
            아니오
          </Button>
          <Button className="h-10 w-28 bg-danger" onClick={deleteReviewModal}>
            네
          </Button>
        </div>
      </dialog>
    </>
  );
}
