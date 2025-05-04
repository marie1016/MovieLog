"use client";

import Button from "@/components/ui/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "@/firebase";
import { useRouter } from "next/navigation";
import { SignupSchemaType, signupSchema } from "@/lib/constants/signupSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { saveUser } from "@/lib/firebase/saveUser";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function SignupPage() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    router.push("/");
  }

  return (
    <div className="mx-auto my-[100px] max-w-[460px]">
      <h1 className="mb-10 text-center text-[40px] font-medium">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("nickname")}
          label="닉네임"
          id="nickname"
          placeholder="닉네임"
          type="text"
          error={errors.nickname}
        />
        <Input
          {...register("email")}
          label="이메일"
          id="email"
          placeholder="이메일"
          error={errors.email}
        />
        <Input
          {...register("password")}
          label="비밀번호"
          id="password"
          type="password"
          placeholder="영문, 숫자를 포함한 8자 이상의 비밀번호"
          error={errors.password}
        />
        <Input
          {...register("confirmPassword")}
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          error={errors.confirmPassword}
        />
        <Button
          type="submit"
          className="my-6 rounded-lg bg-background-blue text-white"
          disabled={isSubmitting}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
