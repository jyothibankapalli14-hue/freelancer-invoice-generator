import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice({ invoices, setInvoices, clients, profile }) {
  const navigate = useNavigate();
  const initialInvoice = {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    currency: profile.defaultCurrency || "INR",
    items: [{ description: "Freelance service", quantity: 1, rate: 0 }],
    taxRate: profile.defaultTaxRate || 18,
    discount: 0,
    status: "Draft",
    notes: "Thank you for choosing our services.",
    terms: "Payment due within 15 days.",
    recurring: "None",
  };

  const [invoice, setInvoice] = useState(initialInvoice);

  const getNextInvoiceNumber = () => {
    const prefix = profile.invoicePrefix || "INV";
    return `${prefix}-${String(invoices.length + 1).padStart(4, "0")}`;
  };

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = invoice.items.map((item, idx) =>
      idx === index ? { ...item, [field]: field === "description" ? value : Number(value) } : item
    );
    setInvoice({ ...invoice, items: updatedItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    if (invoice.items.length === 1) {
      return;
    }

    setInvoice({
      ...invoice,
      items: invoice.items.filter((_, idx) => idx !== index),
    });
  };

  const subtotal = invoice.items.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.rate),
    0
  );
  const taxTotal = (subtotal * Number(invoice.taxRate || 0)) / 100;
  const total = subtotal + taxTotal - Number(invoice.discount || 0);

  const handleClientPick = (e) => {
    const value = e.target.value;
    const client = clients.find((clientItem) => clientItem.name === value);
    if (client) {
      setInvoice({
        ...invoice,
        clientName: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
        clientAddress: client.address,
      });
    } else {
      setInvoice({
        ...invoice,
        clientName: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const billableItems = invoice.items.filter(
      (item) =>
        item.description.trim() &&
        Number(item.quantity) > 0 &&
        Number(item.rate) > 0
    );

    if (!invoice.clientName.trim()) {
      alert("Please enter the client name.");
      return;
    }

    if (!invoice.invoiceDate || !invoice.dueDate) {
      alert("Please select invoice and due dates.");
      return;
    }

    if (!billableItems.length) {
      alert("Please add at least one line item with a description, quantity, and rate greater than 0.");
      return;
    }

    const newInvoice = {
      id: Date.now(),
      number: getNextInvoiceNumber(),
      ...invoice,
      subtotal,
      taxTotal,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setInvoices([...(invoices || []), newInvoice]);
    setInvoice(initialInvoice);
    navigate("/invoices");
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-all duration-300">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Create Invoice</h1>
          <p className="text-gray-500 dark:text-gray-300">Build a professional invoice with itemized billing, taxes, discounts, and recurring setup.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Existing Client</label>
                <select
                  value={invoice.clientName}
                  onChange={handleClientPick}
                  className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Choose a client or type a new one</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Invoice Currency</label>
                <select
                  name="currency"
                  value={invoice.currency}
                  onChange={handleChange}
                  className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="clientName"
                value={invoice.clientName}
                onChange={handleChange}
                placeholder="Client Name *"
                required
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                name="clientEmail"
                value={invoice.clientEmail}
                onChange={handleChange}
                placeholder="Client Email"
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="clientPhone"
                value={invoice.clientPhone}
                onChange={handleChange}
                placeholder="Client Phone"
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                name="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="clientAddress"
                value={invoice.clientAddress}
                onChange={handleChange}
                placeholder="Billing Address"
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                name="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Line Items</h2>
              {invoice.items.map((item, index) => (
                <div key={index} className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr] items-end">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    placeholder="Description *"
                    required
                    className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    min="1"
                    required
                    className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      min="0.01"
                      step="0.01"
                      placeholder="Rate *"
                      required
                      className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={invoice.items.length === 1}
                      className="px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Add Item
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="number"
                name="taxRate"
                value={invoice.taxRate}
                onChange={handleChange}
                placeholder="Tax Rate (%)"
                min="0"
                step="0.01"
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                type="number"
                name="discount"
                value={invoice.discount}
                onChange={handleChange}
                placeholder="Discount"
                min="0"
                step="0.01"
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <select
                name="status"
                value={invoice.status}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select
                name="recurring"
                value={invoice.recurring}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <option>None</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

            <textarea
              name="notes"
              value={invoice.notes}
              onChange={handleChange}
              placeholder="Invoice notes"
              className="w-full p-4 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              rows="4"
            />

            <textarea
              name="terms"
              value={invoice.terms}
              onChange={handleChange}
              placeholder="Terms and conditions"
              className="w-full p-4 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              rows="4"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-semibold"
            >
              Save Invoice
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4">Invoice Summary</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
                  <p className="font-semibold">Invoice Date</p>
                  <p>{invoice.invoiceDate}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
                  <p className="font-semibold">Due Date</p>
                  <p>{invoice.dueDate}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
                <p className="font-semibold">Client</p>
                <p>{invoice.clientName || "No client selected"}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
                <p className="font-semibold">Invoice Total</p>
                <p className="text-3xl font-bold">{invoice.currency} {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInvoice;
