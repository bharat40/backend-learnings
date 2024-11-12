import React from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.log("Login failed! please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="h-[360px] bg-white flex flex-col w-[400px] rounded-sm p-6 gap-8"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            className="p-1 border"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="p-1 border"
          />
        </div>
        <Link
          to="/register"
          className="text-center text-blue-600 hover:underline"
        >
          New here?
        </Link>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
