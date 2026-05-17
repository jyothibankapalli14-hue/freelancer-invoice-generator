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
app.use(cors());

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