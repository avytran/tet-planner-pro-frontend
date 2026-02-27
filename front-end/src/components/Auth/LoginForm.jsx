import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema } from "@/schemas/login.schema";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (formData) => {
    setSubmitting(true);
    setError("");

    try {
      const { email, password } = formData;

      await login({ email, password });

    } catch (err) {
      let errorMessage = "Something went wrong. Please try again.";

      if (err.errors?.length) {
        const msg = err.errors[0].message;

        if (msg.includes("Unauthorized")) {
          errorMessage = "Email or password is incorrect.";
        }
      }

      if (err.networkError) {
        errorMessage = "Server error. Please try again.";
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90">
      <Card className="flex flex-col md:flex-row overflow-hidden">
        <CardSection className="w-full md:w-1/2 space-y-6">
          <div className="space-y-2 text-center md:text-left mb-10">
            <h1 className="font-bold text-primary-strong text-center text-5xl">
              LOGIN
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <InputField
              icon={<FaRegUserCircle />}
              label="Email"
              placeholder="m@example.com"
              required
              disabled={submitting}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              icon={<TbLockPassword />}
              disabled={submitting}
              rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Server error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="body-link underline">
                Forgot your password?
              </Link>
              <AuthButton
                type="submit"
                color="danger"
                label={submitting ? "Logging in..." : "Login"}
                disabled={submitting}
              />
            </div>

            <div className="text-center text-primary-strong mt-10 flex items-center justify-center gap-2">
              <p className="font-body-strong font-bold">
                Don&apos;t have an account?{" "}
              </p>
              <Link to="/sign-up" className="body-link underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardSection>

        <div className="hidden md:block w-full md:w-1/2 bg-neutral-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
      </Card>
    </div>
  );
};