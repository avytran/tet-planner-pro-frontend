import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card } from "./Card";
import { InputField } from "./InputField";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";
import { AuthApi } from "../../utils/api";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const newPassword = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
      }

      const response = await AuthApi.resetPassword(token, newPassword);

      if (response && response.message) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Reset Password error:", err);
      
      let errorMessage = "Failed to reset password. Please try again.";
      
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

  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          RESET PASSWORD
        </h1>
        <p className="text-center font-body-strong text-black">What would you like your new password to be?</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <InputField
          icon={<TbLockPassword />}
          label="New Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={isLoading || !token}
        />
        <InputField
          icon={<TbLockPassword />}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          disabled={isLoading || !token}
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
            label={isLoading ? "Resetting..." : "Reset Password"}
            disabled={isLoading || !token}
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