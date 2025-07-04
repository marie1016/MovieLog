export function changeCreatedAtToDate(createdAt: {
  seconds: number;
  nanoseconds: number;
}) {
  const createdAtToDate = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000,
  );

  return createdAtToDate;
}
