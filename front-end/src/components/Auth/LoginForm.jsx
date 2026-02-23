import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthApi } from "../../utils/api";
import { LOGIN } from "@/graphql/mutations/auth.mutation";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { data, loading }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      await login({
        variables: {
          input: { email, password },
        },
      });

      if (data?.login?.accessToken) {
        localStorage.setItem("accessToken", data.login.accessToken);
        navigate("/");
      }

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

          <form className="space-y-4" onSubmit={handleSubmit}>

            <InputField
              icon={<FaRegUserCircle />}
              label="Email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={loading}
            />

            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              icon={<TbLockPassword />}
              disabled={loading}
              rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />
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
                label={loading ? "Logging in..." : "Login"}
                disabled={loading}
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