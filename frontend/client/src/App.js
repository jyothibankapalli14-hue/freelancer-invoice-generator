import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import Sidebar from "./components/Sidebar";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";

import CreateInvoice from "./pages/CreateInvoice";

import Invoices from "./pages/Invoices";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Settings from "./pages/Settings";

import {
  getInvoices,
} from "./api/invoiceApi";

function AppContent() {

  const location = useLocation();

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // Hide Sidebar
  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // Invoice State
  const [invoices, setInvoices] = useState(() => {

    const savedInvoices =
      localStorage.getItem("invoices");

    return savedInvoices
      ? JSON.parse(savedInvoices)
      : [];
  });

  // Save Invoices
  useEffect(() => {

  fetchInvoices();

}, []);

const fetchInvoices =
  async () => {

    try {

      const res =
        await getInvoices();

      setInvoices(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const [companyInfo, setCompanyInfo] = useState({

  companyName: "Freelancer Invoice",

  email: "support@invoiceapp.com",

  phone: "+91 9876543210",

  address: "Vizag, Andhra Pradesh",
});

  return (

    <div className={darkMode ? "dark flex" : "flex"}>

      {/* Sidebar */}
      {!hideSidebar && (

        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

      )}

      {/* Main Content */}
      <div
        className={`

          w-full
          min-h-screen
          p-6

          bg-gray-100
          dark:bg-slate-900

          transition-all
          duration-300

          ${!hideSidebar
            ? "md:ml-64"
            : ""
          }
        `}
      >

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>

                <Dashboard
                  invoices={invoices}
                />

              </ProtectedRoute>
            }
          />

          {/* Create Invoice */}
          <Route
            path="/create-invoice"
            element={
              <ProtectedRoute>

                <CreateInvoice
                  invoices={invoices}
                  setInvoices={setInvoices}
                />

              </ProtectedRoute>
            }
          />

          {/* Invoices */}
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>

                <Invoices
                  invoices={invoices}
                  setInvoices={setInvoices}
                />

              </ProtectedRoute>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
  path="/settings"
  element={
    <ProtectedRoute>

      <Settings
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  setInvoices={setInvoices}

  companyInfo={companyInfo}
  setCompanyInfo={setCompanyInfo}
/>
    </ProtectedRoute>
  }
/>

        </Routes>

      </div>

    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;