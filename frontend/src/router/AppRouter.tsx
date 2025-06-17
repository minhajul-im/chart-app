import { Route, Routes } from "react-router";
import { HomePage } from "../pages/home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="/contact" element={<div>Contact</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
