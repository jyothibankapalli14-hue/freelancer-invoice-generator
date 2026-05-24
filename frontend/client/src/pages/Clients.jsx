import { useState } from "react";

function Clients({ clients, setClients, invoices }) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    taxId: "",
  });

  const filteredClients = clients.filter((client) => {
    const term = search.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.company.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term)
    );
  });

  const handleChange = (e) => {
    setClientForm({
      ...clientForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientForm.name || !clientForm.email) {
      alert("Please provide client name and email.");
      return;
    }

    if (editingId) {
      setClients(
        clients.map((client) =>
          client.id === editingId
            ? { ...client, ...clientForm }
            : client
        )
      );
      setEditingId(null);
    } else {
      setClients([
        ...clients,
        {
          id: Date.now(),
          ...clientForm,
        },
      ]);
    }

    setClientForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      taxId: "",
    });
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setClientForm({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      address: client.address,
      taxId: client.taxId,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this client?")) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  const getInvoiceCount = (clientName) =>
    invoices.filter((invoice) => invoice.clientName === clientName).length;

  return (
    <div className="text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-8">Client Management</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] mb-10">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-5">Add / Edit Client</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={clientForm.name}
                onChange={handleChange}
                placeholder="Client Name"
                className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                name="company"
                value={clientForm.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="email"
                value={clientForm.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                name="phone"
                value={clientForm.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <textarea
              name="address"
              value={clientForm.address}
              onChange={handleChange}
              placeholder="Billing Address"
              className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <input
              name="taxId"
              value={clientForm.taxId}
              onChange={handleChange}
              placeholder="GST/VAT Number"
              className="w-full p-3 rounded-xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl font-semibold"
            >
              {editingId ? "Update Client" : "Add Client"}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Client List</h2>
              <p className="text-gray-500 dark:text-gray-300">
                Track client activity, invoices, and contact records.
              </p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full sm:w-72 p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {filteredClients.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No clients found.
              </div>
            )}

            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold">{client.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{client.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{client.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{client.phone}</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Invoices: {getInvoiceCount(client.name)}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(client)}
                    className="px-4 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(client.id)}
                    className="px-4 py-2 rounded-2xl bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
