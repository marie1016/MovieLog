"use client";

import Button from "@/components/ui/button";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import auth from "@/lib/firebase/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/constants/loginSchema";
import Input from "@/components/ui/input";
import { loginErrorMessage } from "@/lib/constants/loginErrorMessages";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      // 서버로 idToken 토큰 전달
      const idToken = await getIdToken(userCredential.user);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        credentials: "include",
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message =
          loginErrorMessage[error.code] || "로그인에 실패했습니다.";
        setError("root", { type: "firebase", message });
      }
    }
  };

  return (
    <div className="mx-auto my-16 max-w-[460px] px-5">
      <h1 className="mb-10 text-center text-3xl font-medium">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          placeholder="이메일"
          type="email"
          error={errors.email}
          className="rounded-b-none"
          authStyle
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="비밀번호"
          error={errors.password}
          className="rounded-t-none border-t-0"
          authStyle
        />
        {errors.root?.message && (
          <p className="mt-3 text-[14px] text-danger">{errors.root.message}</p>
        )}
        <Button
          type="submit"
          className={`mt-9 bg-blue ${isSubmitting ? "bg-gray600" : "bg-blue"}`}
          disabled={isSubmitting}
        >
          로그인
        </Button>
        <Button
          onClick={() => router.push("/signup")}
          className="mt-2.5 bg-background-darkGray"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
