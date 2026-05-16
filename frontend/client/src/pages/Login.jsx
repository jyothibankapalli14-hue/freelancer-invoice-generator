import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      alert(error.message);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-900">

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">

          Don't have an account?

          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer ml-2"
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;