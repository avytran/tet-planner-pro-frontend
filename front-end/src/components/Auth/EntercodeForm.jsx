import { Card } from "./Card";
import { InputField } from "./InputField";
import { MdOutlineNumbers } from "react-icons/md";
import AuthButton from "./Button";
import { Link } from "react-router-dom";


export const EntercodeForm = () => {
  return (
    <Card className="w-full max-w-5xl lg:max-w-6xl space-y-6 opacity-90 p-15 py-30">
      <div className="space-y-2 text-center md:text-left mb-10">
        <h1 className="font-bold text-primary-strong text-center text-5xl">
          ENTER CODE
        </h1>
        <p className="text-center font-body-strong text-black">Enter the code sent to your email</p>
      </div>

      <form className="space-y-4 w-1/3 mx-auto">
        <InputField
          icon={<MdOutlineNumbers />}
          label="Code"
          name="code"
          type="text"
          placeholder="123456"
          required
        />

        <div className="flex justify-center mt-15"> 
        <AuthButton type="submit" color="danger" label="Verify Code"/>
        </div>
      </form>
    </Card>
  );
};