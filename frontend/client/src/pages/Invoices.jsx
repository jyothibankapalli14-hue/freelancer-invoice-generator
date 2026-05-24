import { useState } from "react";
import jsPDF from "jspdf";

<<<<<<< HEAD
function Invoices({ invoices, setInvoices, companyInfo, user }) {
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [editedInvoice, setEditedInvoice] = useState(null);
=======
import {
  deleteInvoice as deleteInvoiceAPI,
} from "../api/invoiceApi";

import {
  updateInvoice as updateInvoiceAPI,
} from "../api/invoiceApi";

function Invoices({

  invoices,
  setInvoices,

  companyInfo,

}) {

  const [editingInvoice, setEditingInvoice] = useState(null);

>>>>>>> 22075725b887ba89c918bccc696b3e1f20434606
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const isAdmin = user?.role === "Admin";

<<<<<<< HEAD
=======
  const [updatedInvoice, setUpdatedInvoice] = useState({
  client: "",
  address: "",
  amount: "",
  status: "",
});

  const deleteInvoice = async (id) => {

  try {

    // Delete from MongoDB
    await deleteInvoiceAPI(id);

    // Update UI
    const filteredInvoices =
      invoices.filter(
        (invoice) =>
          invoice._id !== id
      );

    setInvoices(filteredInvoices);

  } catch (error) {

    console.log(error);
  }
};
  // Start Edit
  const startEdit = (invoice) => {

    setEditingInvoice(invoice._id);

    setUpdatedInvoice({
      client: invoice.client,
      address: invoice.address,
      amount: invoice.amount,
      status: invoice.status,
    });
  };

  // Handle Change
  const handleChange = (e) => {

    setUpdatedInvoice({
      ...updatedInvoice,
      [e.target.name]: e.target.value,
    });
  };

  // Save Invoice
  const saveUpdatedInvoice =
  async (id) => {

    try {

      const res =
        await updateInvoiceAPI(
          id,
          updatedInvoice
        );

      const updatedInvoices =
        invoices.map((invoice) =>

          invoice._id === id
            ? res.data
            : invoice
        );

      setInvoices(
        updatedInvoices
      );

      setEditingInvoice(null);

    } catch (error) {

      console.log(error);
    }
  };
  // Download PDF
  const downloadPDF = (invoice) => {

  const doc = new jsPDF();

// Load Logo
const img = new Image();

img.src = "/logo.jpg";

  // Colors
  const purple = [124, 58, 237];

  const lightPurple = [243, 232, 255];

  // Background
  doc.setFillColor(250, 250, 250);

  doc.rect(0, 0, 210, 297, "F");

  // Header
  doc.setFontSize(34);

  doc.setTextColor(...purple);

  doc.text(
    "INVOICE",
    135,
    25
  );

  // Company Info
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(20);

 doc.text(
  "companyInfo.companyName",
  60,
  28
);

  doc.setFontSize(11);

  doc.text(
  "Vizag, Andhra Pradesh",
  60,
  38
);

 doc.text(
  "support@invoiceapp.com",
  60,
  45
);

 doc.text(
  "+91 9876543210",
  60,
  52
);

  // Line
  doc.setDrawColor(...purple);

  doc.line(20, 58, 190, 58);

  // Billing Address Box
  doc.setFillColor(...lightPurple);

  doc.roundedRect(
    20,
    70,
    70,
    40,
    3,
    3,
    "F"
  );

  doc.setFontSize(12);

  doc.setTextColor(...purple);

  doc.text(
    "BILLING ADDRESS",
    25,
    80
  );

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(11);

  doc.text(
    invoice.client,
    25,
    92
  );


doc.text(
  invoice.address || "Client Address",
  25,
  100
);
  // Invoice Details Box
  doc.setFillColor(...lightPurple);

  doc.roundedRect(
    120,
    70,
    70,
    40,
    3,
    3,
    "F"
  );

  doc.setTextColor(0, 0, 0);

  doc.text(
    `Invoice ID:`,
    125,
    82
  );

  doc.text(
    `INV-${invoice._id}`,
    155,
    82
  );

  doc.text(
    `Date:`,
    125,
    94
  );

  doc.text(
    invoice.date,
    155,
    94
  );

  doc.text(
    `Status:`,
    125,
    106
  );

  doc.text(
    invoice.status,
    155,
    106
  );

  // Table Header
  doc.setFillColor(...purple);

  doc.rect(
    20,
    130,
    170,
    12,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(12);

  doc.text(
    "DESCRIPTION",
    28,
    138
  );

  doc.text(
    "AMOUNT",
    145,
    138
  );

  // Table Row
  doc.setDrawColor(200);

  doc.rect(
    20,
    142,
    170,
    18
  );

  doc.setTextColor(0, 0, 0);

  doc.text(
    "Freelance Service",
    28,
    153
  );

  doc.text(
    `Rs. ${invoice.amount}`,
    145,
    153
  );

  // Total Box
  doc.setFillColor(...lightPurple);

  doc.roundedRect(
    115,
    180,
    75,
    40,
    3,
    3,
    "F"
  );

  doc.setFontSize(12);

  doc.text(
    "Sub Total",
    125,
    192
  );

  doc.text(
    `Rs. ${invoice.amount}`,
    160,
    192
  );

  doc.text(
    "Tax",
    125,
    202
  );

  doc.text(
    "Rs. 0",
    160,
    202
  );

  doc.setFontSize(14);

  doc.setTextColor(...purple);

  doc.text(
    "TOTAL",
    125,
    214
  );

  doc.text(
    `Rs. ${invoice.amount}`,
    160,
    214
  );

  // Footer
  doc.setDrawColor(...purple);

  doc.line(
    20,
    250,
    190,
    250
  );

  doc.setFontSize(11);

  doc.setTextColor(100);

  doc.text(
    "Thank you for choosing our services!",
    20,
    260
  );

  doc.text(
    "Authorized Signature",
    145,
    260
  );

  // Bottom Footer
  doc.setFillColor(...purple);

  doc.rect(
    0,
    280,
    210,
    17,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(10);

  doc.text(
    "www.invoiceapp.com",
    20,
    290
  );

  doc.text(
    "support@invoiceapp.com",
    80,
    290
  );

  doc.text(
    "+91 9876543210",
    160,
    290
  );

  img.onload = () => {

  // Logo
  doc.addImage(
    img,
    "JPEG",
    20,
    12,
    28,
    28
  );
    // Save PDF
  doc.save(
    `${invoice.client}-invoice.pdf`
  );

};

};
  
  // Search + Filter
>>>>>>> 22075725b887ba89c918bccc696b3e1f20434606
  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();
    const matchesSearch =
      invoice.clientName?.toLowerCase().includes(query) ||
      invoice.number?.toLowerCase().includes(query);
    const matchesStatus =
      filterStatus === "All" ? true : invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const startEdit = (invoice) => {
    setEditingInvoiceId(invoice.id);
    setEditedInvoice({ ...invoice });
  };

  const saveInvoice = () => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === editingInvoiceId
          ? { ...invoice, ...editedInvoice, updatedAt: new Date().toISOString() }
          : invoice
      )
    );
    setEditingInvoiceId(null);
    setEditedInvoice(null);
  };

  const deleteInvoice = (id) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
    }
  };

  const togglePaymentStatus = (invoice) => {
    const nextStatus = invoice.status === "Paid" ? "Pending" : "Paid";
    setInvoices(
      invoices.map((item) =>
        item.id === invoice.id
          ? { ...item, status: nextStatus, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const downloadPDF = (invoice) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const width = doc.internal.pageSize.getWidth();
    const margin = 40;
    const currency = invoice.currency || "INR";
    const qtyX = width - 250;
    const rateX = width - 135;
    const totalX = width - margin;
    let y = 40;

    if (companyInfo.logo) {
      try {
        doc.addImage(companyInfo.logo, "PNG", margin, y, 80, 80);
      } catch (error) {
        // ignore invalid logo data
      }
    }

    doc.setFontSize(24);
    doc.text("INVOICE", width - margin, y + 20, { align: "right" });

    y += 90;
    doc.setFontSize(12);
    doc.text(companyInfo.companyName || "Freelancer Invoice", margin, y);
    doc.text(companyInfo.address || "", margin, y + 16);
    doc.text(companyInfo.email || "", margin, y + 32);
    doc.text(companyInfo.phone || "", margin, y + 48);
    if (companyInfo.gstNumber) {
      doc.text(`GST/VAT: ${companyInfo.gstNumber}`, margin, y + 64);
    }

    doc.text(`Invoice #: ${invoice.number}`, width - margin, y, { align: "right" });
    doc.text(`Date: ${invoice.invoiceDate}`, width - margin, y + 16, { align: "right" });
    doc.text(`Due: ${invoice.dueDate}`, width - margin, y + 32, { align: "right" });
    doc.text(`Status: ${invoice.status}`, width - margin, y + 48, { align: "right" });

    y += 90;
    doc.setFontSize(14);
    doc.text("Bill To", margin, y);
    doc.setFontSize(12);
    doc.text(invoice.clientName || "", margin, y + 18);
    if (invoice.clientEmail) doc.text(invoice.clientEmail, margin, y + 34);
    if (invoice.clientPhone) doc.text(invoice.clientPhone, margin, y + 50);
    if (invoice.clientAddress) doc.text(invoice.clientAddress, margin, y + 66);

    y += 100;
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y, width - margin * 2, 25, "F");
    doc.setTextColor(20);
    doc.text("Description", margin + 10, y + 18);
    doc.text("Qty", qtyX, y + 18, { align: "right" });
    doc.text("Rate", rateX, y + 18, { align: "right" });
    doc.text("Total", totalX, y + 18, { align: "right" });

    y += 35;
    (invoice.items || []).forEach((item) => {
      const qty = Number(item.quantity || 1);
      const rate = Number(item.rate || 0);
      const lineTotal = qty * rate;
      const description = doc.splitTextToSize(item.description || "Service", qtyX - margin - 30)[0];

      doc.text(description, margin + 10, y);
      doc.text(String(qty), qtyX, y, { align: "right" });
      doc.text(`${currency} ${rate.toFixed(2)}`, rateX, y, { align: "right" });
      doc.text(`${currency} ${lineTotal.toFixed(2)}`, totalX, y, { align: "right" });
      y += 20;
    });

    y += 14;
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y, width - margin, y);
    y += 24;

    const summaryLabelX = width - 230;
    const summaryValueX = width - margin;
    doc.text("Subtotal:", summaryLabelX, y);
    doc.text(`${currency} ${Number(invoice.subtotal || 0).toFixed(2)}`, summaryValueX, y, { align: "right" });
    y += 18;
    doc.text(`Tax (${invoice.taxRate || 0}%):`, summaryLabelX, y);
    doc.text(`${currency} ${Number(invoice.taxTotal || 0).toFixed(2)}`, summaryValueX, y, { align: "right" });
    y += 18;
    doc.text("Discount:", summaryLabelX, y);
    doc.text(`${currency} ${Number(invoice.discount || 0).toFixed(2)}`, summaryValueX, y, { align: "right" });
    y += 26;
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Total:", summaryLabelX, y);
    doc.text(`${currency} ${Number(invoice.total || 0).toFixed(2)}`, summaryValueX, y, { align: "right" });
    doc.setFont(undefined, "normal");

    y += 40;
    doc.setFontSize(11);
    if (invoice.notes) doc.text(invoice.notes, margin, y);
    y += 18;
    if (invoice.terms) doc.text(invoice.terms, margin, y);

    doc.save(`${invoice.number || invoice.clientName}-invoice.pdf`);
  };

  return (
    <div className="text-gray-800 dark:text-white transition-all duration-300">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            {isAdmin ? "Search, filter, download and manage invoice records." : "Search, filter and download your invoices."}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search invoice number or client"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/2 p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full lg:w-1/4 p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        >
          <option value="All">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-slate-600">
              <th className="text-left p-4">Invoice</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500 dark:text-gray-400">No invoices found.</td>
              </tr>
            )}
<<<<<<< HEAD
            {filteredInvoices.map((invoice) => {
              const isOverdue = invoice.status !== "Paid" && new Date(invoice.dueDate) < new Date();
              return (
                <tr key={invoice.id} className="border-b dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                  <td className="p-4">
                    <div className="font-semibold">{invoice.number}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{invoice.invoiceDate}</div>
                  </td>
                  <td className="p-4">{invoice.clientName}</td>
                  <td className="p-4">{invoice.currency} {Number(invoice.total || invoice.amount || 0).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-full text-white ${invoice.status === "Paid" ? "bg-green-500" : invoice.status === "Pending" ? "bg-blue-500" : "bg-red-500"}`}>
=======

            {/* Invoice Rows */}
            {filteredInvoices.map((invoice) => (

              <tr
                key={invoice._id}
                className="border-b dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >

                {/* Client */}
                <td className="p-4">

                  {editingInvoice === invoice._id ? (

                    <input
                      type="text"
                      name="client"
                      value={updatedInvoice.client}
                      onChange={handleChange}
                      className="

                        border
                        dark:border-slate-600

                        dark:bg-slate-700
                        dark:text-white

                        p-2
                        rounded-lg
                      "
                    />

                  ) : (
                    invoice.client
                  )}

                </td>

                {/* Address */}
<td className="p-4">

  {editingInvoice === invoice._id ? (

    <input
      type="text"
      name="address"
      value={updatedInvoice.address}
      onChange={handleChange}
      className="

        border
        dark:border-slate-600

        dark:bg-slate-700
        dark:text-white

        p-2
        rounded-lg
      "
    />

  ) : (

    invoice.address

  )}

</td>

                {/* Amount */}
                <td className="p-4">

                  {editingInvoice === invoice._id ? (

                    <input
                      type="number"
                      name="amount"
                      value={updatedInvoice.amount}
                      onChange={handleChange}
                      className="

                        border
                        dark:border-slate-600

                        dark:bg-slate-700
                        dark:text-white

                        p-2
                        rounded-lg
                      "
                    />

                  ) : (
                    `₹ ${invoice.amount}`
                  )}

                </td>

                {/* Status */}
                <td className="p-4">

                  {editingInvoice === invoice._id ? (

                    <select
                      name="status"
                      value={updatedInvoice.status}
                      onChange={handleChange}
                      className="

                        border
                        dark:border-slate-600

                        dark:bg-slate-700
                        dark:text-white

                        p-2
                        rounded-lg
                      "
                    >

                      <option value="Paid">
                        Paid
                      </option>

                      <option value="Pending">
                        Pending
                      </option>

                    </select>

                  ) : (

                    <span
                      className={`

                        px-4
                        py-1
                        rounded-full
                        text-white

                        ${invoice.status === "Paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                        }
                      `}
                    >

>>>>>>> 22075725b887ba89c918bccc696b3e1f20434606
                      {invoice.status}
                    </span>
<<<<<<< HEAD
                    {isOverdue && <div className="text-xs text-rose-400 mt-1">Overdue</div>}
                  </td>
                  <td className="p-4">{invoice.dueDate}</td>
                  <td className="p-4 flex flex-wrap gap-2">
                    {editingInvoiceId === invoice.id && isAdmin ? (
                      <>
                        <button onClick={saveInvoice} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Save</button>
                        <button onClick={() => setEditingInvoiceId(null)} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-xl">Cancel</button>
                      </>
                    ) : (
                      <>
                        {isAdmin && (
                          <>
                            <button onClick={() => startEdit(invoice)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">Edit</button>
                            <button onClick={() => togglePaymentStatus(invoice)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl">Toggle Paid</button>
                            <button onClick={() => deleteInvoice(invoice.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">Delete</button>
                          </>
                        )}
                        <button onClick={() => downloadPDF(invoice)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl">PDF</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
=======

                  )}

                </td>

                {/* Date */}
<td className="p-4">

  {invoice.date}

</td>

                {/* Buttons */}
                <td className="p-4 flex flex-wrap gap-2">

                  {editingInvoice === invoice._id ? (

                    <button
                      onClick={() => saveInvoice(invoice._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >

                      Save

                    </button>

                  ) : (

                    <button
                      onClick={() => startEdit(invoice)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >

                      Edit

                    </button>

                  )}

                  <button
                    onClick={() => deleteInvoice(invoice._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                  <button
                    onClick={() => downloadPDF(invoice)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >

                    PDF

                  </button>

                </td>

              </tr>

            ))}

>>>>>>> 22075725b887ba89c918bccc696b3e1f20434606
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoices;
