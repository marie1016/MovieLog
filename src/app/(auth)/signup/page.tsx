"use client";

import Button from "@/components/ui/button";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import auth from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { SignupSchemaType, signupSchema } from "@/lib/constants/signupSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { saveUser } from "@/lib/firebase/saveUser";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const { user } = userCredential;

      // 닉네임 업데이트
      await updateProfile(user, {
        displayName: values.nickname,
      });

      // firestore에 유저 정보 저장
      await saveUser(user);

      // 서버로 idToken 토큰 전달
      const idToken = await getIdToken(user);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto my-16 max-w-[460px] px-5">
      <h1 className="mb-10 text-center text-3xl font-medium">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("nickname")}
          label="닉네임"
          id="nickname"
          placeholder="닉네임"
          type="text"
          error={errors.nickname}
          authStyle
        />
        <Input
          {...register("email")}
          label="이메일"
          id="email"
          placeholder="이메일"
          error={errors.email}
          authStyle
        />
        <Input
          {...register("password")}
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호"
          error={errors.password}
          authStyle
        />
        <p className="my-1 text-sm text-gray600">
          영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해 주세요.
        </p>
        <Input
          {...register("confirmPassword")}
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.confirmPassword}
          authStyle
        />
        <Button
          type="submit"
          className="my-6 rounded-lg bg-blue text-white"
          disabled={isSubmitting}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
