import clsx from "clsx";
import { SkeletonPosterImage } from "./SkeletonPosterImage";

export default function SkeletonReviewHeader({
  variant = "feed",
}: {
  variant?: "feed" | "detail";
}) {
  const isDetail = variant === "detail";

  return isDetail ? (
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
  const dimension = size === "lg" && "sm:h-[256px]";
  return (
    <>
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full items-start gap-4">
          <SkeletonPosterImage size={size} />
          {/* Info */}
          <div
            className={clsx(
              dimension,
              "flex h-[155px] w-full flex-col items-start justify-between",
            )}
          >
            <div className="flex w-full flex-col gap-1 text-left">
              <div className="skeleton h-5 w-2/3" />
              <div className="skeleton h-5 w-2/3" />
              <div className="skeleton h-5 w-2/5" />
            </div>
            <div className="skeleton h-5 w-2/5" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex min-h-20 flex-col gap-2">
        <div className="skeleton h-5 w-1/5" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-2/3" />
      </div>
    </>
  );
}
