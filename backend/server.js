<<<<<<< HEAD
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freelancer_invoice_generator";
const DATA_FILE = path.join(__dirname, "data", "db.json");
const JWT_SECRET = process.env.JWT_SECRET || "invoice_backend_secret";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

const userSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    role: { type: String, enum: ["Admin", "Freelancer", "Client"], default: "Freelancer" },
    createdAt: String,
  },
  { collection: "users", strict: false }
);

const ownedRecordSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.Mixed,
    userId: { type: String, index: true, required: true },
  },
  { strict: false }
);

const User = mongoose.model("User", userSchema);
const Client = mongoose.model("Client", ownedRecordSchema, "clients");
const Invoice = mongoose.model("Invoice", ownedRecordSchema, "invoices");
const Profile = mongoose.model("Profile", ownedRecordSchema, "profiles");
const Company = mongoose.model("Company", ownedRecordSchema, "companies");

function serialize(record) {
  if (!record) {
    return record;
  }

  const plain = record.toObject ? record.toObject() : record;
  delete plain._id;
  delete plain.__v;
  return plain;
}

function serializeMany(records) {
  return records.map(serialize);
}

async function loadJsonBackup() {
  try {
    const file = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(file);
  } catch {
    return null;
  }
}

async function migrateJsonBackupIfNeeded() {
  const hasUsers = await User.exists({});
  if (hasUsers) {
    return;
  }

  const db = await loadJsonBackup();
  if (!db) {
    return;
  }

  if (Array.isArray(db.users) && db.users.length) {
    await User.insertMany(db.users, { ordered: false });
  }

  if (Array.isArray(db.clients) && db.clients.length) {
    await Client.insertMany(db.clients, { ordered: false });
  }

  if (Array.isArray(db.invoices) && db.invoices.length) {
    await Invoice.insertMany(db.invoices, { ordered: false });
  }

  if (Array.isArray(db.profiles) && db.profiles.length) {
    await Profile.insertMany(db.profiles, { ordered: false });
  }

  if (Array.isArray(db.companies) && db.companies.length) {
    await Company.insertMany(db.companies, { ordered: false });
  }

  console.log("Imported existing JSON data into MongoDB.");
}

async function connectDb() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected");
  await migrateJsonBackupIfNeeded();
}

function createToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
}

function getUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

async function requireAdmin(req, res, next) {
  const user = await User.findOne({ id: req.userId }).lean();
  if (!user || user.role !== "Admin") {
    return res.status(403).json({ message: "Admin access is required." });
  }

  next();
}

function normalizeRole(role) {
  const allowedRoles = ["Admin", "Freelancer", "Client"];
  return allowedRoles.includes(role) ? role : "Freelancer";
}

function getDefaultCompany() {
  return {
    companyName: "Freelancer Invoice",
    email: "support@invoiceapp.com",
    phone: "+91 9876543210",
    address: "Vizag, Andhra Pradesh",
    gstNumber: "",
    logo: "",
    paymentUrl: "https://stripe.com",
  };
}

function getDefaultProfile(name = "", email = "", role = "Freelancer") {
  return {
    name,
    email,
    role,
    gstNumber: "",
    invoicePrefix: "INV",
    defaultCurrency: "INR",
    defaultTaxRate: 18,
    paymentDetails: "Bank transfer, UPI or Stripe",
    logo: "",
  };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findUserByEmail(email) {
  return User.findOne({ email: new RegExp(`^${escapeRegex(email)}$`, "i") }).lean();
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function getVisibleInvoiceQuery(user) {
  if (user.role === "Admin") {
    return { userId: user.id };
  }

  return {
    $or: [
      { userId: user.id },
      { clientEmail: new RegExp(`^${escapeRegex(user.email)}$`, "i") },
    ],
  };
}

async function getUserData(user) {
  const invoiceQuery = getVisibleInvoiceQuery(user);
  const [profile, companyInfo, clients, invoices] = await Promise.all([
    Profile.findOne({ userId: user.id }).lean(),
    Company.findOne({ userId: user.id }).lean(),
    Client.find({ userId: user.id }).lean(),
    Invoice.find(invoiceQuery).lean(),
  ]);

  return {
    user: publicUser(user),
    profile: serialize(profile) || getDefaultProfile(user.name, user.email, user.role),
    companyInfo: serialize(companyInfo) || getDefaultCompany(),
    clients: serializeMany(clients),
    invoices: serializeMany(invoices),
  };
}

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const role = normalizeRole(req.body.role);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    id: uuidv4(),
    name,
    email,
    passwordHash: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
  });

  const profile = { userId: user.id, ...getDefaultProfile(name, email, role) };
  const companyInfo = { userId: user.id, ...getDefaultCompany() };
  await Promise.all([Profile.create(profile), Company.create(companyInfo)]);

  const token = createToken(user);
  return res.json({
    token,
    user: publicUser(user),
    profile,
    companyInfo,
    clients: [],
    invoices: [],
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = createToken(user);
  return res.json({ token, ...(await getUserData(user)) });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  return res.status(200).json({ message: "Password reset instructions have been sent to your email address." });
});

app.get("/api/auth/me", getUserFromToken, async (req, res) => {
  const user = await User.findOne({ id: req.userId }).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json(await getUserData(user));
});

app.get("/api/clients", getUserFromToken, async (req, res) => {
  const clients = await Client.find({ userId: req.userId }).lean();
  return res.json(serializeMany(clients));
});

app.put("/api/clients", getUserFromToken, requireAdmin, async (req, res) => {
  const { clients } = req.body;
  if (!Array.isArray(clients)) {
    return res.status(400).json({ message: "Clients must be an array." });
  }

  await Client.deleteMany({ userId: req.userId });
  const updatedClients = clients.map((client) => ({
    ...client,
    id: client.id || uuidv4(),
    userId: req.userId,
  }));

  if (updatedClients.length) {
    await Client.insertMany(updatedClients);
  }

  return res.json(updatedClients);
});

app.get("/api/invoices", getUserFromToken, async (req, res) => {
  const user = await User.findOne({ id: req.userId }).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const invoices = await Invoice.find(getVisibleInvoiceQuery(user)).lean();
  return res.json(serializeMany(invoices));
});

app.put("/api/invoices", getUserFromToken, requireAdmin, async (req, res) => {
  const { invoices } = req.body;
  if (!Array.isArray(invoices)) {
    return res.status(400).json({ message: "Invoices must be an array." });
  }

  await Invoice.deleteMany({ userId: req.userId });
  const updatedInvoices = invoices.map((invoice) => ({
    ...invoice,
    id: invoice.id || uuidv4(),
    userId: req.userId,
  }));

  if (updatedInvoices.length) {
    await Invoice.insertMany(updatedInvoices);
  }

  return res.json(updatedInvoices);
});

app.get("/api/profile", getUserFromToken, async (req, res) => {
  const user = await User.findOne({ id: req.userId }).lean();
  const profile = await Profile.findOne({ userId: req.userId }).lean();
  return res.json(serialize(profile) || getDefaultProfile(user?.name, user?.email, user?.role));
});

app.put("/api/profile", getUserFromToken, requireAdmin, async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.userId },
    { ...req.body, userId: req.userId },
    { new: true, upsert: true }
  ).lean();

  return res.json(serialize(profile));
});

app.get("/api/company", getUserFromToken, async (req, res) => {
  const companyInfo = await Company.findOne({ userId: req.userId }).lean();
  return res.json(serialize(companyInfo) || getDefaultCompany());
});

app.put("/api/company", getUserFromToken, requireAdmin, async (req, res) => {
  const companyInfo = await Company.findOneAndUpdate(
    { userId: req.userId },
    { ...req.body, userId: req.userId },
    { new: true, upsert: true }
  ).lean();

  return res.json(serialize(companyInfo));
});

app.get("/api/dashboard", getUserFromToken, async (req, res) => {
  const [invoices, clients] = await Promise.all([
    Invoice.find({ userId: req.userId }).lean(),
    Client.find({ userId: req.userId }).lean(),
  ]);

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid").length;
  const pendingInvoices = invoices.filter((invoice) => invoice.status === "Pending").length;
  const overdueInvoices = invoices.filter((invoice) => {
    const dueDate = new Date(invoice.dueDate || invoice.invoiceDate || invoice.date);
    return invoice.status !== "Paid" && dueDate < new Date();
  }).length;
  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.total || invoice.amount || 0), 0);
  const outstandingRevenue = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.total || invoice.amount || 0), 0);

  return res.json({
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalRevenue,
    outstandingRevenue,
    clientCount: clients.length,
  });
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB.");
    console.error(`Tried: ${MONGO_URI}`);
    console.error("Start local MongoDB or add MONGO_URI to backend/.env.");
    console.error(error.message);
    process.exit(1);
  });
=======
const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();

const connectDB =
  require("./config/db");
connectDB();

const invoiceRoutes =
  require("./routes/invoiceRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Routes
app.use(
  "/api/invoices",
  invoiceRoutes
);

// Test Route
app.get("/", (req, res) => {

  res.send(
    "Backend Running 🚀"
  );
});

// PORT
const PORT =
  process.env.PORT || 5000;

// Server
app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});
>>>>>>> 22075725b887ba89c918bccc696b3e1f20434606
