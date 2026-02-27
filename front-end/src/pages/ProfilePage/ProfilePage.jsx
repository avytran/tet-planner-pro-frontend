import "./ProfilePage.css";
import avatarImg from "@/assets/images/avatar.png";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Loading/Spinner/Spinner";
import { useTotalBudget } from "@/hooks/useTotalBudget";
import { parseProfileFromGetProfile } from "@/schemas/profile.schema";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/Button/CommonButton";
import { useTheme } from "@/hooks/useTheme";
import Divider from "@mui/material/Divider";
function formatNumberVi(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return "0";
  return n.toLocaleString("en-US");
}

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profile = useMemo(() => parseProfileFromGetProfile(user), [user]);
  const { totalBudget, loading: budgetLoading } = useTotalBudget(user?.id);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="px-4 py-12 md:p-20 flex flex-col md:flex-row gap-4 bg-white">
      <div className="flex-1  flex flex-col justify-center items-center">
        <h1 className="text-primary font-semibold text-5xl">My Profile</h1>

        <div className="profile-card px-6 py-15 mt-5">
          <div className="profile-avatar mb-4">
            <img src={avatarImg} alt="Avatar" />
          </div>

          <div className="text-body text-primary font-bold text-2xl">
            {profile?.fullName ?? "—"}
          </div>
          <div className="text-primary">{profile?.email ?? "—"}</div>

          <div className="text-2xl text-primary font-semibold mt-1 ">
            Total Budget:
            <span className="ml-2 text-primary">
              {budgetLoading ? "…" : `${formatNumberVi(totalBudget)} VND`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row py-5 gap-5 ">
          <p className="font-bold text-primary text-2xl ">Theme</p>
          <button
            className={`py-4  px-6 border border-pink-500 rounded-4xl hover:bg-pink-500 hover:text-white cursor-pointer ${theme === "blossom" ? "bg-pink-500 text-white" : "text-pink-500"}`}
            onClick={toggleTheme}
          >
            Blossom 🌸
          </button>
          <button
            className={`py-4  px-6 border border-yellow-500 rounded-4xl hover:bg-yellow-500 hover:text-white cursor-pointer ${theme === "apricot" ? "bg-yellow-500 text-white" : "text-yellow-500"}`}
            onClick={toggleTheme}
          >
            Apricot 🏵️
          </button>
        </div>
        <CommonButton
          onClick={handleLogout}
          disabled={isLoggingOut}
          label={isLoggingOut ? "Logging out..." : "Log out"}
          color="danger"
        />
      </div>
    </div>
  );
}
