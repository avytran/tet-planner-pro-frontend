import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Spinner from "@/components/Loading/Spinner/Spinner";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <Spinner />;

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <Outlet />
    );
};