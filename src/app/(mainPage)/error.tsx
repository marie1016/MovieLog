"use client";

import Button from "@/components/ui/button";
import Image from "next/image";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  console.log(error);
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/images/error.svg"
        width={100}
        height={100}
        alt="에러 아이콘"
        className="mx-auto"
      />
      <div className="text-center text-lg">
        <h1>일시적인 오류입니다.</h1>
        <p className="text-gray600">잠시 후에 다시 시도해 주세요.</p>
      </div>
      <Button className="w-28 bg-blue" onClick={() => window.location.reload()}>
        다시 시도
      </Button>
    </div>
  );
}
