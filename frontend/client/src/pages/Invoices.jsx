import { useState } from "react";

import jsPDF from "jspdf";

import {
  deleteInvoice as deleteInvoiceAPI,
} from "../api/invoiceApi";

function Invoices({

  invoices,
  setInvoices,

  companyInfo,

}) {

  const [editingInvoice, setEditingInvoice] = useState(null);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");

  const [updatedInvoice, setUpdatedInvoice] = useState({
  client: "",
  address: "",
  amount: "",
  status: "",
});

  // Delete Invoice
  const deleteInvoice = async (id) => {

  try {

    await deleteInvoiceAPI(id);

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
  const saveInvoice = (id) => {

    const updatedInvoices = invoices.map((invoice) =>

      invoice.id === id
        ? { ...invoice, ...updatedInvoice }
        : invoice
    );

    setInvoices(updatedInvoices);

    setEditingInvoice(null);
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
  const filteredInvoices = invoices.filter((invoice) => {

    const matchesSearch =
      invoice.client
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "All"
        ? true
        : invoice.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (

    <div className="text-gray-800 dark:text-white transition-all duration-300">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">

        Invoices

      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="

            border
            dark:border-slate-600

            dark:bg-slate-700
            dark:text-white

            p-3
            rounded-lg

            w-full
            md:w-1/2
          "
        />

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="

            border
            dark:border-slate-600

            dark:bg-slate-700
            dark:text-white

            p-3
            rounded-lg

            w-full
            md:w-1/4
          "
        >

          <option value="All">
            All Status
          </option>

          <option value="Paid">
            Paid
          </option>

          <option value="Pending">
            Pending
          </option>

        </select>

      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b dark:border-slate-600">

              <th className="text-left p-4">
                Client
              </th>

              <th className="text-left p-4">
                Address
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {/* Empty State */}
            {filteredInvoices.length === 0 && (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-500"
                >

                  No invoices found

                </td>

              </tr>

            )}

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

                      {invoice.status}

                    </span>

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

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Invoices;