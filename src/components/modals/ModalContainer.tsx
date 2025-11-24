import { RootState } from "@/lib/store";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const EditReviewModal = dynamic(() => import("./EditReviewModal"), {
  ssr: false,
});
const DeleteReviewModal = dynamic(() => import("./DeleteReviewModal"), {
  ssr: false,
});
const MyReviewModal = dynamic(() => import("./MyReviewModal"), {
  ssr: false,
});
const SearchReviewsModal = dynamic(() => import("./SearchReviewsModal"), {
  ssr: false,
});

export default function ModalContainer() {
  const { modalType, modalProps } = useSelector(
    (state: RootState) => state.modal,
  );

  let modalContent = null;
  switch (modalType) {
    case "edit":
      modalContent = <EditReviewModal id={modalProps?.id} />;
      break;
    case "delete":
      modalContent = <DeleteReviewModal id={modalProps?.id} />;
      break;
    case "myReview":
      modalContent = <MyReviewModal dateStr={modalProps?.dateStr} />;
      break;
    case "searchReviews":
      modalContent = <SearchReviewsModal />;
      break;
    default:
      modalContent = null;
  }

  if (modalContent)
    return (
      <div className="fixed inset-0 z-10 h-screen w-screen bg-black/60">
        {modalContent}
      </div>
    );
}
