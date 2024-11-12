import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ensures cookies are included
      });
      if (res.ok) {
        navigate("/login");
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  items-center justify-center gap-3 my-3">
      <h1>welcome to Dashboard</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-sm"
        onClick={handleClick}
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
