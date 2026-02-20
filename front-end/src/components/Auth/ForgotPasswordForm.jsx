import { Card } from "./Card";
import { InputField } from "./InputField";
import { FaRegUserCircle } from "react-icons/fa";
import AuthButton from "./Button";
import { Link } from "react-router-dom";


export const ForgotPasswordForm = () => {
  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          FORGOT PASSWORD
        </h1>
        <p className="text-center font-body-strong text-black">Enter your email address and we will send you a link to reset your password</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto">
        <InputField
          icon={<FaRegUserCircle />}
          label="Email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />

        <div className="flex justify-between mt-15"> 
        <Link to="/login" className="body-link underline">Cancel</Link>
        <AuthButton type="submit" color="danger" label="Send Code"/>
        </div>
      </form>
    </Card>
  );
};