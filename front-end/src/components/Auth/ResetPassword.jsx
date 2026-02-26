import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";
import { RESET_PASSWORD } from "@/graphql/mutations/auth.mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/schemas/login.schema";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const onSubmit = async (formData) => {
    if (!token) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const { newPassword } = formData;

      const { data } = await resetPassword({
        variables: {
          input: {
            token, 
            newPassword,
          }
        }
      });

      if (data.resetPassword?.message) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      let message = "Failed to reset password. Please try again.";

      if (err.errors?.length) {
        message = err.errors[0].message;
      } else if (err.networkError) {
        message = "Server error. Please try again.";
      }

      setError(message);
    }
  };

  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          RESET PASSWORD
        </h1>
        <p className="text-center font-body-strong text-black">What would you like your new password to be?</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          icon={<TbLockPassword />}
          label="New Password"
          type="password"
          placeholder="••••••••"
          required
          disabled={loading || !token}
          error={errors.newPassword?.message}x
          {...register("newPassword")}
        />
        <InputField
          icon={<TbLockPassword />}
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
          disabled={loading || !token}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex justify-center mt-15"> 
          <AuthButton 
            type="submit" 
            color="danger" 
            label={loading ? "Resetting..." : "Reset Password"}
            disabled={loading || !token}
          />
        </div>

        {!token && (
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="body-link underline">
              Request a new reset link
            </Link>
          </div>
        )}
      </form>
    </Card>
  );
};