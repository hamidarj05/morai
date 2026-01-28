import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
    <div className="bg-[#111827]"> <AppRoutes /></div>
    </BrowserRouter>
  );
}
