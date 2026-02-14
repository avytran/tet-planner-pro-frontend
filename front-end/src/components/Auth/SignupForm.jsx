import React from "react";
import { Link } from "react-router-dom";
import { Card, CardSection } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import AuthButton from "./Button";
import logo from "../../assets/images/logo.jpg";


export const SignupForm = () => {
  return (
    <div className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90">
      <Card className="flex flex-col md:flex-row overflow-hidden">
        <CardSection className="w-full md:w-1/2 space-y-6">
          <div className="space-y-2 text-center md:text-left mb-10">
            <h1 className="font-bold text-primary-strong text-center text-5xl">
              SIGN UP
            </h1>
          </div>

          <form className="space-y-4">
            <InputField
              icon={<FaRegUserCircle />}
              label="Email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            
            <InputField
                icon={<ImProfile />}
                label="Name"
                name="name"
                type="text"
                placeholder="Nguyen Van A"
                required
              />
            
            <InputField
              label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                icon={<TbLockPassword />}
              />
            <div className="flex items-center justify-center"> 
              <AuthButton type="submit" color="danger" label="Sign Up"/>
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
                <img src={logo}  alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
      </Card>
    </div>
  );
};