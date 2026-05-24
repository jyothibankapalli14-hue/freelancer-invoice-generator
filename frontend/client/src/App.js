import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { authLogin, authRegister, authMe, updateClients, updateInvoices, updateProfile, updateCompanyInfo } from "./api";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";

const defaultCompanyInfo = {
  companyName: "Freelancer Invoice",
  email: "support@invoiceapp.com",
  phone: "+91 9876543210",
  address: "Vizag, Andhra Pradesh",
  gstNumber: "",
  logo: "",
  paymentUrl: "https://stripe.com",
};

const defaultProfile = {
  name: "",
  role: "Freelancer",
  gstNumber: "",
  invoicePrefix: "INV",
  defaultCurrency: "INR",
  defaultTaxRate: 18,
  paymentDetails: "Bank transfer, UPI or Stripe",
  logo: "",
};

function AppContent() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("invoice_darkMode")) ?? false;
    } catch {
      return false;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("invoice_token"));
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(defaultCompanyInfo);
  const [profile, setProfile] = useState(defaultProfile);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("invoice_token", token);
    } else {
      localStorage.removeItem("invoice_token");
    }
  }, [token]);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setAppReady(true);
        return;
      }

      try {
        const data = await authMe();
        setUser(data.user);
        setInvoices(data.invoices || []);
        setClients(data.clients || []);
        setCompanyInfo(data.companyInfo || defaultCompanyInfo);
        setProfile(data.profile || defaultProfile);
      } catch (error) {
        console.error(error);
        setToken(null);
        setUser(null);
      } finally {
        setAppReady(true);
      }
    };

    loadUser();
  }, [token]);

  const handleLogin = async (email, password) => {
    const data = await authLogin(email, password);
    setToken(data.token);
    setUser(data.user);
    setInvoices(data.invoices || []);
    setClients(data.clients || []);
    setCompanyInfo(data.companyInfo || defaultCompanyInfo);
    setProfile(data.profile || defaultProfile);
  };

  const handleRegister = async (name, email, password, role) => {
    const data = await authRegister(name, email, password, role);
    setToken(data.token);
    setUser(data.user);
    setInvoices(data.invoices || []);
    setClients(data.clients || []);
    setCompanyInfo(data.companyInfo || defaultCompanyInfo);
    setProfile(data.profile || defaultProfile);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setInvoices([]);
    setClients([]);
    setCompanyInfo(defaultCompanyInfo);
    setProfile(defaultProfile);
  };

  const setClientsAndSync = async (nextClients) => {
    setClients(nextClients);
    if (user) {
      try {
        await updateClients(nextClients);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setInvoicesAndSync = async (nextInvoices) => {
    setInvoices(nextInvoices);
    if (user) {
      try {
        await updateInvoices(nextInvoices);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setProfileAndSync = async (nextProfile) => {
    setProfile(nextProfile);
    if (user) {
      try {
        await updateProfile(nextProfile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setCompanyInfoAndSync = async (nextCompanyInfo) => {
    setCompanyInfo(nextCompanyInfo);
    if (user) {
      try {
        await updateCompanyInfo(nextCompanyInfo);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password";

  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
        Loading application...
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark flex" : "flex"}>
      {!hideSidebar && (
        <Sidebar
          user={user}
          profile={profile}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={handleLogout}
        />
      )}

      <div
        className={`w-full min-h-screen p-6 bg-gray-100 dark:bg-slate-900 transition-all duration-300 ${
          !hideSidebar ? "md:ml-64" : ""
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user} allowedRoles={["Admin"]}>
                <Dashboard invoices={invoices} clients={clients} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-invoice"
            element={
              <ProtectedRoute user={user} allowedRoles={["Admin"]}>
                <CreateInvoice
                  invoices={invoices}
                  setInvoices={setInvoicesAndSync}
                  clients={clients}
                  profile={profile}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute user={user}>
                <Invoices
                  invoices={invoices}
                  setInvoices={setInvoicesAndSync}
                  companyInfo={companyInfo}
                  user={user}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute user={user} allowedRoles={["Admin"]}>
                <Clients
                  clients={clients}
                  setClients={setClientsAndSync}
                  invoices={invoices}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} allowedRoles={["Admin"]}>
                <Profile profile={profile} setProfile={setProfileAndSync} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user} allowedRoles={["Admin"]}>
                <Settings
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  companyInfo={companyInfo}
                  setCompanyInfo={setCompanyInfoAndSync}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
