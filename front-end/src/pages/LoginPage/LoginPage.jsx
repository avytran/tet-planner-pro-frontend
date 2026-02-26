import { LoginForm } from "../../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

export const LoginPage = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading]);

  return <LoginForm />;
};

