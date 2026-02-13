import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import TaskManagementPage from "../pages/TaskManagementPage";
import BudgetManagementPage from "../pages/BudgetManagementPage";
import ShoppingListPage from "../pages/ShoppingListPage";
import AboutPage from "../pages/AboutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="task-management" element={<TaskManagementPage />} />
        <Route path="budget-management" element={<BudgetManagementPage />} />
        <Route path="shopping-list" element={<ShoppingListPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
