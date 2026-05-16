import { useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

function Sidebar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Logout Function
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`

          bg-slate-900
          dark:bg-slate-950

          text-white

          w-64
          h-screen

          fixed
          top-0
          left-0

          p-5
          z-40

          transform
          transition-transform
          duration-300

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Logo */}
        <h1 className="text-3xl font-bold mb-10 text-cyan-400">

          Invoice App

        </h1>

        {/* Menu */}
        <ul className="space-y-4">

          {/* Dashboard */}
          <li>

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-700 transition"
            >
              Dashboard
            </NavLink>

          </li>

          {/* Create Invoice */}
          <li>

            <NavLink
              to="/create-invoice"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-700 transition"
            >
              Create Invoice
            </NavLink>

          </li>

          {/* Invoices */}
          <li>

            <NavLink
              to="/invoices"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-700 transition"
            >
              Invoices
            </NavLink>

          </li>

          {/* Theme Toggle */}
          <li>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full text-left p-3 rounded-lg hover:bg-slate-700 transition"
            >

              {darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}

            </button>

          </li>

          {/* Logout */}
          <li>

            <button
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-lg hover:bg-red-500 transition"
            >
              Logout
            </button>

          </li>

          <li>

  <NavLink
    to="/settings"
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>

      `block p-3 rounded-lg transition

      ${isActive
        ? "bg-blue-500"
        : "hover:bg-slate-700"}`
    }
  >

    Settings

  </NavLink>

</li>

        </ul>

      </div>

    </>
  );
}

export default Sidebar;