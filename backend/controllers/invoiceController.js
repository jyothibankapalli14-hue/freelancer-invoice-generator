const Invoice =
  require("../models/Invoice");

// Create Invoice
const createInvoice =
  async (req, res) => {

    try {

      const invoice =
        await Invoice.create(
          req.body
        );

      res.status(201).json(
        invoice
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

// Get All Invoices
const getInvoices =
  async (req, res) => {

    try {

      const invoices =
        await Invoice.find();

      res.status(200).json(
        invoices
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

// Delete Invoice
const deleteInvoice =
  async (req, res) => {

    try {

      await Invoice.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Invoice Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {

  createInvoice,

  getInvoices,

  deleteInvoice,
};