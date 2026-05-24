import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
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
      await onLogin(formData.email, formData.password);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-2xl"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-2xl"
            required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl font-semibold">
            Login
          </button>
        </form>
        <div className="text-center mt-5 text-sm text-gray-500 dark:text-gray-300">
          <button onClick={() => navigate("/reset-password")} className="text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Don't have an account?
          <button onClick={() => navigate("/register")} className="ml-2 text-blue-500 hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
