import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            borderRadius: "1rem",
            padding: "1rem 1.5rem",
            fontSize: "12px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }
        }}
      />
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
