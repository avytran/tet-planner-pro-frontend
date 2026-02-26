import "./ProfilePage.css";
import avatarImg from "@/assets/images/avatar.png";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Loading/Spinner/Spinner";
import { useTotalBudget } from "@/hooks/useTotalBudget";
import { parseProfileFromGetProfile } from "@/schemas/profile.schema";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          <img src={avatarImg} alt="Avatar" />
        </div>

        <div className="profile-name">{profile?.fullName ?? "—"}</div>
        <div className="profile-email">{profile?.email ?? "—"}</div>

        <div className="profile-budget">
          <span className="profile-budget-label">Total Budget:</span>{" "}
          <span className="profile-budget-value">
            {budgetLoading ? "…" : formatNumberVi(totalBudget)}
          </span>
        </div>
      </div>

      <button
        className="profile-logout-btn"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
}

