import { Card } from "./Card";
import { InputField } from "./InputField";
import { TbLockPassword } from "react-icons/tb";
import AuthButton from "./Button";


export const ResetPasswordForm = () => {
  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          RESET PASSWORD
        </h1>
        <p className="text-center font-body-strong text-black">What would you like your new password to be?</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto">
        <InputField
          icon={<TbLockPassword />}
          label="New Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
        <InputField
          icon={<TbLockPassword />}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
        />

        <div className="flex justify-center mt-15"> 
        <AuthButton type="submit" color="danger" label="Reset Password"/>
        </div>
      </form>
    </Card>
  );
};