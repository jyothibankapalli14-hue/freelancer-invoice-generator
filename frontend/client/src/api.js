import baseUrl from "./api/baseUrl";

async function request(path, options = {}) {
  const headers = options.headers || {};
  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("invoice_token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message || "Request failed.";
    throw new Error(message);
  }
  return data;
}

export async function authRegister(name, email, password, role) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
}

export async function authLogin(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function authResetPassword(email) {
  return request("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function authMe() {
  return request("/api/auth/me");
}

export async function getClients() {
  return request("/api/clients");
}

export async function updateClients(clients) {
  return request("/api/clients", {
    method: "PUT",
    body: JSON.stringify({ clients }),
  });
}

export async function getInvoices() {
  return request("/api/invoices");
}

export async function updateInvoices(invoices) {
  return request("/api/invoices", {
    method: "PUT",
    body: JSON.stringify({ invoices }),
  });
}

export async function getProfile() {
  return request("/api/profile");
}

export async function updateProfile(profile) {
  return request("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}

export async function getCompanyInfo() {
  return request("/api/company");
}

export async function updateCompanyInfo(companyInfo) {
  return request("/api/company", {
    method: "PUT",
    body: JSON.stringify(companyInfo),
  });
}

export async function getDashboard() {
  return request("/api/dashboard");
}
