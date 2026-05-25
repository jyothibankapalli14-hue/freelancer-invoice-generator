import axios from "axios";
import baseUrl from "../api/baseUrl";

const API = `${baseUrl}/api/invoices`;

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

  // Update Invoice
export const updateInvoice =
  async (id, updatedData) => {

    return await axios.put(

      `${API}/${id}`,

      updatedData
    );
  };