import {
  changePasswordSchema,
  forgetPasswordSchema,
  signInSchema,
  signUpSchema,
  validateUserSchema,
} from "@/schema/validation";
import { z } from "zod";

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

export type ValidateUserSchema = z.infer<typeof validateUserSchema>;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
