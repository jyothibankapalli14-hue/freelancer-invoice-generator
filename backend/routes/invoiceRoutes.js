const express =
  require("express");

const router =
  express.Router();

const {

  createInvoice,

  getInvoices,

  deleteInvoice,

} = require(
  "../controllers/invoiceController"
);

// Create Invoice
router.post(
  "/",
  createInvoice
);

// Get All Invoices
router.get(
  "/",
  getInvoices
);

// Delete Invoice
router.delete(
  "/:id",
  deleteInvoice
);

module.exports = router;