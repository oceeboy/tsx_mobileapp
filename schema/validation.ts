import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name has to have more than 2 characters"),
  lastName: z.string().min(2, "Last name has to have more than 2 characters"),
  userName: z.string().min(5, "Username has to have more than 5 characters"),
  email: z.string().email("Please enter a vaild email address"),
  password: z.string().min(8, "Password must be more than 8 characters"),
});

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 6 characters"),
});

const validateUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),

  otp: z
    .string({
      required_error: "Otp is required",
    })
    .min(1, "Must be above 1 character")
    .max(6, "Must be 6 characters"),
});

const forgetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),
});

const changePasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),
  otp: z
    .string({
      required_error: "Otp is required",
    })
    .min(1, "Must be above 1 character")
    .max(6, "Must be 6 characters"),
  newPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 6 characters"),
});

export {
  signInSchema,
  signUpSchema,
  forgetPasswordSchema,
  validateUserSchema,
  changePasswordSchema,
};
