const express =
  require("express");

const router =
  express.Router();

const {

  createInvoice,

  getInvoices,

  deleteInvoice,

  updateInvoice,

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

router.put(
  "/:id",
  updateInvoice
);

module.exports = router;