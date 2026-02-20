import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";
import { AuthApi } from "../../utils/api";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const fullName = formData.get("name"); 
      const password = formData.get("password");

      const response = await AuthApi.register(fullName, email, password);

      if (response && (response.id || response.email)) {
        setSuccess("Created a new account successfully! Please login to continue.");
      } else {
        setError("Email already exists");
      }
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Register error:", err);
      console.error("Register error response:", err.response?.data);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response?.data?.message) {
        const message = err.response.data.message;
        if (Array.isArray(message) && message.length > 0) {
          errorMessage = message[0].charAt(0).toUpperCase() + message[0].slice(1);
        } else if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      else if (err.graphqlErrors && err.graphqlErrors.length > 0) {
        const graphqlMessage = err.graphqlErrors[0].message;
        if (graphqlMessage.includes('Backend error') && graphqlMessage.includes('{')) {
          try {
            const jsonMatch = graphqlMessage.match(/\{.*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed.message && Array.isArray(parsed.message) && parsed.message.length > 0) {
                errorMessage = parsed.message[0].charAt(0).toUpperCase() + parsed.message[0].slice(1);
              } else if (parsed.message && typeof parsed.message === 'string') {
                errorMessage = parsed.message;
              } else {
                errorMessage = graphqlMessage;
              }
            } else {
              errorMessage = graphqlMessage;
            }
          } catch {
            errorMessage = graphqlMessage;
          }
        } else {
          errorMessage = graphqlMessage;
        }
      }
      else if (err.response?.data?.errors) {
        const graphqlMessage = err.response.data.errors[0].message;
        if (graphqlMessage.includes('Backend error') && graphqlMessage.includes('{')) {
          try {
            const jsonMatch = graphqlMessage.match(/\{.*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed.message && Array.isArray(parsed.message) && parsed.message.length > 0) {
                errorMessage = parsed.message[0].charAt(0).toUpperCase() + parsed.message[0].slice(1);
              } else if (parsed.message && typeof parsed.message === 'string') {
                errorMessage = parsed.message;
              } else {
                errorMessage = graphqlMessage;
              }
            } else {
              errorMessage = graphqlMessage;
            }
          } catch {
            errorMessage = graphqlMessage;
          }
        } else {
          errorMessage = graphqlMessage;
        }
      } 
      else if (err.response) {
        errorMessage = 
          err.response.data?.error ||
          `Server error: ${err.response.status} ${err.response.statusText}`;
      } 
      else if (err.request) {
        errorMessage = "No response from server. Please check if the server is running.";
      } 
      else if (err.message) {
        try {
          const jsonMatch = err.message.match(/\{.*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.message && Array.isArray(parsed.message) && parsed.message.length > 0) {
              errorMessage = parsed.message[0].charAt(0).toUpperCase() + parsed.message[0].slice(1);
            } else if (parsed.message && typeof parsed.message === 'string') {
              errorMessage = parsed.message;
            } else {
              errorMessage = err.message;
            }
          } else {
            errorMessage = err.message;
          }
        } catch {
          errorMessage = err.message;
        }
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
              SIGN UP
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
              icon={<ImProfile />}
              label="Name"
              name="name"
              type="text"
              placeholder="Nguyen Van A"
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
            
            <div className="flex items-center justify-center"> 
              <AuthButton 
                type="submit" 
                color="danger" 
                label={isLoading ? "Signing up..." : "Sign Up"}
                disabled={isLoading}
              />
            </div>

            <div className="text-center text-primary-strong mt-10 flex items-center justify-center gap-2">
              <p className="font-body-strong font-bold">Already have an account?{" "}</p>
              <Link to="/login" className="body-link underline">
                Login
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