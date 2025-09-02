import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import MyReviewModal from "./MyReviewModal";
import SearchReviewsModal from "./SearchReviewsModal";

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
