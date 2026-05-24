import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Freelancer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all registration fields.");
      return;
    }

    try {
      await onRegister(formData.name, formData.email, formData.password, formData.role);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-2xl"
            required
          />
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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white p-3 rounded-2xl"
          >
            <option>Freelancer</option>
            <option>Client</option>
            <option>Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl font-semibold">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?
          <button onClick={() => navigate("/login")} className="ml-2 text-blue-500 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
