import { Routes, Route } from "react-router-dom";
import { ExamplePage } from "../pages/ExamplePage";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<ExamplePage />} />
    </Routes>
  );
}
