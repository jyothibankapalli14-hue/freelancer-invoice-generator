import axios from "axios";

const API =
  "http://localhost:5000/api/invoices";

// Get All Invoices
export const getInvoices =
  async () => {

    return await axios.get(API);
  };

// Create Invoice
export const createInvoice =
  async (invoiceData) => {

    return await axios.post(
      API,
      invoiceData
    );
  };

// Delete Invoice
export const deleteInvoice =
  async (id) => {

    return await axios.delete(
      `${API}/${id}`
    );
  };