import { useState } from "react";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import AuthButton from "./Button";
import { Link } from "react-router-dom";
import { AuthApi } from "../../utils/api";

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");

      const response = await AuthApi.forgotPassword(email);

      if (response && response.message) {
        setShowSuccess(true);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } catch (err) {
      console.error("Forgot Password error:", err);
      
      let errorMessage = "Failed to send reset email. Please try again.";
      
      if (err.graphqlErrors && err.graphqlErrors.length > 0) {
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
      } else if (err.response?.data?.errors) {
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
      } else if (err.response) {
        errorMessage = 
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

  if (showSuccess) {
    return (
      <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
        <div className="space-y-6 text-center">
          <h1 className="font-bold text-primary-strong text-center text-5xl">
            Check in your email !
          </h1>
          <p className="text-center font-body-strong text-black text-lg">
            We just emailed you with the instructions to reset your password.
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

      <form className="space-y-4 w-1/3 mx-auto" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <InputField
          icon={<FaRegUserCircle />}
          label="Email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          disabled={isLoading}
        />

        <div className="flex justify-between mt-15"> 
          <Link to="/login" className="body-link underline">Cancel</Link>
          <AuthButton 
            type="submit" 
            color="danger" 
            label={isLoading ? "Sending..." : "Send"}
            disabled={isLoading}
          />
        </div>
      </form>
    </Card>
  );
};