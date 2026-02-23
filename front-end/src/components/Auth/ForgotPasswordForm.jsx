import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client/react";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import AuthButton from "./Button";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD } from "@/graphql/mutations/auth.mutation";
import { forgotPasswordSchema } from "@/schemas/login.schema";

export const ForgotPasswordForm = () => {
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema)
  })

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const onSubmit = async (formData) => {
    setError("");
    setShowSuccess(false);

    try {
      const { email } = formData;

      const { data } = await forgotPassword({
        variables: {
          input: {
            email
          }
        }
      });

      if (data?.forgotPassword?.message) {
        setShowSuccess(true);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } catch (err) {
      const message =
        err?.graphQLErrors?.[0]?.message ||
        err?.networkError?.message ||
        "Failed to send reset email. Please try again.";

      setError(message);
    }
  };

  if (showSuccess) {
    return (
      <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
        <div className="space-y-6 text-center">
          <h1 className="font-bold text-primary-strong text-center text-5xl">
            Check in your email!
          </h1>
          <p className="text-center font-body-strong text-black text-lg">
            If email exists, reset link has been sent.
          </p>
          <div className="mt-10">
            <Link to="/login" className="body-link underline">
              Back to Login
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          FORGOT PASSWORD
        </h1>
        <p className="text-center font-body-strong text-black">Enter your email address and we will send you a link to reset your password</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <InputField
          icon={<FaRegUserCircle />}
          label="Email"
          type="email"
          placeholder="m@example.com"
          required
          disabled={loading}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex justify-between mt-15"> 
          <Link to="/login" className="body-link underline">Cancel</Link>
          <AuthButton 
            type="submit" 
            color="danger" 
            label={loading ? "Sending..." : "Send"}
            disabled={loading}
          />
        </div>
      </form>
    </Card>
  );
};