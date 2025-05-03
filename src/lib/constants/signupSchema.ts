import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = z
  .object({
    nickname: z.string().min(2, { message: "2글자 이상 입력해 주세요." }),
    email: z
      .string()
      .nonempty({ message: "이메일을 입력해 주세요." })
      .email({ message: "이메일을 올바르게 입력해 주세요." }),
    password: z
      .string()
      .min(8, { message: "8자리 이상 입력해 주세요." })
      .max(15, { message: "15자리 이하로 입력해 주세요" })
      .regex(passwordRegex, {
        message:
          "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해 주세요.",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "비밀번호를 다시 입력해 주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
