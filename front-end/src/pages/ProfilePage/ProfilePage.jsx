import "./ProfilePage.css";
import avatarImg from "@/assets/images/avatar.png";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Loading/Spinner/Spinner";
import { useTotalBudget } from "@/hooks/useTotalBudget";
import { parseProfileFromGetProfile } from "@/schemas/profile.schema";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/Button/CommonButton";

function formatNumberVi(value) {
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return "0";
  return n.toLocaleString("vi-VN");
}

export default function ProfilePage() {
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
    <div className="profile-page">
      <h1 className="text-primary font-semibold text-5xl">My Profile</h1>

      <div className="profile-card px-6 py-15 mt-5">
        <div className="profile-avatar mb-4">
          <img src={avatarImg} alt="Avatar" />
        </div>

        <div className="text-body text-black font-bold text-xl">{profile?.fullName ?? "—"}</div>
        <div className="text-black">{profile?.email ?? "—"}</div>

        <div className="text-2xl text-primary font-semibold mt-1 ">Total Budget: 
          <span className="text-black"> {budgetLoading ? "…" : formatNumberVi(totalBudget)}</span></div>
      </div>

      <CommonButton
        onClick={handleLogout}
        disabled={isLoggingOut}
        label={isLoggingOut ? "Logging out..." : "Log out"}
        color="danger"
      />
    </div>
  );
}

