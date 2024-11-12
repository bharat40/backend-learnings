import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json", // send as json
      },
      body: JSON.stringify(formData), // convert formData to json
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
        } else {
          console.log("registration failed");
        }
      })
      .catch((err) => {
        console.log("Error during registration", err);
      });
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
            placeholder="Create username"
            required
            className="p-1 border"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            required
            className="p-1 border"
          />
        </div>
        <Link to="/login" className="text-center text-blue-600 hover:underline">
          Already have an account?
        </Link>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
