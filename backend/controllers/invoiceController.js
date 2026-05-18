const Invoice =
  require("../models/Invoice");

// Update Invoice
const updateInvoice =
  async (req, res) => {

    try {

      const updatedInvoice =
        await Invoice.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.status(200).json(
        updatedInvoice
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

  updateInvoice,
};