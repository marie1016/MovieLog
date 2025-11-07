import clsx from "clsx";

export function SkeletonPosterImage({ size = "sm" }: { size?: "sm" | "lg" }) {
  const dimensions =
    size === "lg"
      ? ["sm:h-[256px] sm:w-[216px]", "sm:w-[150px]"]
      : ["h-[155px] w-[130px]", "w-[90px]"];

  return (
    <div
      className={clsx(
        dimensions[0],
        "flex h-[155px] w-[130px] shrink-0 items-center justify-center rounded-xl border border-gray shadow-lg",
      )}
    >
      <div
        className={clsx(
          "skeleton relative aspect-[2/3] w-[90px] overflow-hidden",
          dimensions[1],
        )}
      />
    </div>
  );
}
