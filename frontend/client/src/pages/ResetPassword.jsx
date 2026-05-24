import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authResetPassword } from "../api";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authResetPassword(email);
      alert("Password reset instructions sent. Please check your inbox.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-8">
          Enter the email address associated with your account and we will send password reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-4 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-semibold">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
