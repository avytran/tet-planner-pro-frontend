import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { REGISTER } from "@/graphql/mutations/auth.mutation";
import { signupSchema } from "@/schemas/signup.schema";

export const SignupForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema)
  })

  const [registerUser, { loading }] = useMutation(REGISTER);

  const onSubmit = async (formData) => {
    setError("");

    try {
      const { email, fullName, password } = formData;

      const { data } = await registerUser({
        variables: {
          input: {
            email,
            fullName,
            password,
          },
        },
      });

      if (data.register) {
        setSuccess("Created a new account successfully! Please login to continue.");
      }

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      let message = "Registration failed. Please try again.";

      const graphQLError = err?.errors?.[0]?.message;

      if (graphQLError) {
        if (graphQLError.includes("exists")) {
          message = "Email already exists.";
        }
      } else if (err.networkError) {
        message = "Server error. Please try again.";
      }

      setError(message);
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

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
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

            {/* Full Name */}
            <InputField
              icon={<ImProfile />}
              label="Name"
              type="text"
              placeholder="Nguyen Van A"
              required
              disabled={loading}
              error={errors.name?.message}
              {...register("fullName")}
            />

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              icon={<TbLockPassword />}
              disabled={loading}
              rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register("password")}
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
                label={loading ? "Signing up..." : "Sign Up"}
                disabled={loading}
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