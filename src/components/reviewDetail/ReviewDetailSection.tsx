import { getReviewById } from "@/lib/firebase/getReviewById";
import ReviewDetailView from "./ReviewDetailView";

export default async function ReviewDetailSection({ id }: { id: string }) {
  const reviewById = await getReviewById(id);

  return <ReviewDetailView reviewById={reviewById} id={id} />;
}
