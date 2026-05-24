import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ user, profile, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.role === "Admin";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        ☰
      </button>

      <div
        className={`bg-slate-900 dark:bg-slate-950 text-white w-64 h-screen fixed top-0 left-0 p-5 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">Invoice Pro</h1>
          <p className="text-sm text-slate-300 mt-2">{user?.email || "Guest user"}</p>
          <p className="text-xs text-slate-500">{user?.role || profile?.role || "Freelancer"}</p>
        </div>

        <ul className="space-y-3">
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-lg hover:bg-slate-700 transition"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-invoice"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-lg hover:bg-slate-700 transition"
                >
                  Create Invoice
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/invoices"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg hover:bg-slate-700 transition"
            >
              Invoices
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/clients"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-lg hover:bg-slate-700 transition"
                >
                  Clients
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-lg hover:bg-slate-700 transition"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block p-3 rounded-lg transition ${
                      isActive ? "bg-blue-500" : "hover:bg-slate-700"
                    }`
                  }
                >
                  Settings
                </NavLink>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() => {
                onLogout?.();
                navigate("/login");
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-red-500 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
