"use client";

import ErrorUI from "@/components/ui/ErrorUI";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  console.log(error);
  return <ErrorUI />;
}
