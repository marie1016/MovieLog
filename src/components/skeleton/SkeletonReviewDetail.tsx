import { SkeletonPosterImage } from "./SkeletonPosterImage";

export default function SkeletonReviewHeader({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const isLarge = size === "lg";

  return isLarge ? (
    <>
      <div className="skeleton mx-auto mb-6 h-5 w-1/5" />
      <div className="mb-3 flex justify-end">
        <div className="skeleton h-5 w-1/5" />
      </div>
    </>
  ) : (
    <div className="mb-3 flex justify-between">
      <div className="skeleton h-5 w-1/5" />
      <div className="skeleton h-5 w-1/5" />
    </div>
  );
}

export function SkeletonReviewInfo({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <>
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full items-start gap-4">
          <SkeletonPosterImage size={size} />
          {/* Info */}
          <div className="flex w-full flex-col gap-1">
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-5 w-2/5" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex min-h-20 flex-col gap-2">
        <div className="skeleton h-5 w-1/5" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-2/3" />
      </div>
    </>
  );
}
