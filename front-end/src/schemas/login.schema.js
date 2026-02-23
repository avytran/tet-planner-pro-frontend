import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Confirm password must match new password")
    .required("Confirm password is required"),
})