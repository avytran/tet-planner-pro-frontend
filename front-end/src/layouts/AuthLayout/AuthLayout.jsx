import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/auth-bg.jpg";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center w-full p-4 md:p-8 lg:p-12" 
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <Outlet />
    </div>
  );
}
