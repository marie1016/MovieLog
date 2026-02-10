import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function getElapsedTime(date: string) {
  const now = dayjs();
  const reviewDate = dayjs(date);

  const diff = now.diff(reviewDate, "day");

  if (diff > 3) {
    return reviewDate.format("YYYY.MM.DD");
  }

  return reviewDate.fromNow();
}
