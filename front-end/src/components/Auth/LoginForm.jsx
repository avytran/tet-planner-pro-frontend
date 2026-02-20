import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";
import { AuthApi } from "../../utils/api";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await AuthApi.login(email, password);

      if (response && (response.accessToken || response.user)) {
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      let errorMessage = "Login failed. Please check your credentials and try again.";
      
      if (err.graphqlErrors && err.graphqlErrors.length > 0) {
        errorMessage = err.graphqlErrors[0].message;
      } else if (err.response?.data?.errors) {
        errorMessage = err.response.data.errors[0].message;
      } else if (err.response) {
        errorMessage = 
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        errorMessage = "No response from server. Please check if the server is running.";
      } else {
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              icon={<TbLockPassword />}
              disabled={isLoading}
            />
            {error && (
                          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">Email or password is incorrect</span>
                          </div>
            )}

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="body-link underline">
                Forgot your password?
              </Link>
              <AuthButton 
                type="submit" 
                color="danger" 
                label={isLoading ? "Logging in..." : "Login"}
                disabled={isLoading}
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