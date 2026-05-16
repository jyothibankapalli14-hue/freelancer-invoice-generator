import { useState } from "react";

import { useNavigate } from "react-router-dom";

function CreateInvoice({ invoices, setInvoices }) {

  const navigate = useNavigate();

  // Form State
  const [invoice, setInvoice] = useState({
  client: "",
  address: "",
  amount: "",
  status: "",
});
  // Handle Change
  const handleChange = (e) => {

    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = (e) => {

    e.preventDefault();

    // Validation
    if (
     !invoice.client ||
     !invoice.address ||
     !invoice.amount ||
     !invoice.status
    ) {

      alert("Please fill all fields");

      return;
    }

    // Create New Invoice
   const newInvoice = {

  id: Date.now(),

  client: invoice.client,

  address: invoice.address,

  amount: invoice.amount,

  status: invoice.status,

  date: new Date().toLocaleDateString(),
};
    // Save Invoice
    setInvoices([
      ...invoices,
      newInvoice,
    ]);

    // Clear Form
    setInvoice({
  client: "",
  address: "",
  amount: "",
  status: "",
});

    // Navigate
    navigate("/invoices");
  };

  return (

    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-300">

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3">

            Create Invoice

          </h1>

          <p className="text-gray-500 dark:text-gray-300">

            Generate and manage freelancer invoices professionally

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Client Name */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">

              Client Name

            </label>

            <input
              type="text"
              name="client"
              placeholder="Enter client name"
              value={invoice.client}
              onChange={handleChange}
              className="

                w-full
                p-4

                rounded-2xl

                border
                border-gray-300
                dark:border-slate-600

                bg-white
                dark:bg-slate-800

                dark:text-white

                outline-none

                focus:ring-4
                focus:ring-blue-300

                transition
              "
            />

          </div>

          {/* Client Address */}
<div>

  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">

    Client Address

  </label>

  <textarea
    name="address"
    placeholder="Enter client address"
    value={invoice.address}
    onChange={handleChange}
    className="

      w-full
      p-4

      rounded-2xl

      border
      border-gray-300
      dark:border-slate-600

      bg-white
      dark:bg-slate-800

      dark:text-white

      outline-none

      focus:ring-4
      focus:ring-blue-300

      transition
    "
  />

</div>

          {/* Amount */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">

              Amount

            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={invoice.amount}
              onChange={handleChange}
              className="

                w-full
                p-4

                rounded-2xl

                border
                border-gray-300
                dark:border-slate-600

                bg-white
                dark:bg-slate-800

                dark:text-white

                outline-none

                focus:ring-4
                focus:ring-blue-300

                transition
              "
            />

          </div>

          {/* Status */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">

              Payment Status

            </label>

            <select
              name="status"
              value={invoice.status}
              onChange={handleChange}
              className="

                w-full
                p-4

                rounded-2xl

                border
                border-gray-300
                dark:border-slate-600

                bg-white
                dark:bg-slate-800

                dark:text-white

                outline-none

                focus:ring-4
                focus:ring-blue-300

                transition
              "
            >

              <option value="">
                Select Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

            </select>

          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg">

            <h2 className="text-2xl font-bold mb-4">

              Invoice Preview

            </h2>

            <div className="space-y-2">

              <p>

                <span className="font-semibold">

                  Client:

                </span>

                {" "}
                {invoice.client || "Client Name"}

              </p>

              <p>

                <span className="font-semibold">

                  Amount:

                </span>

                {" "}
                ₹ {invoice.amount || 0}

              </p>

              <p>

                <span className="font-semibold">

                  Status:

                </span>

                {" "}
                {invoice.status || "Pending"}

              </p>

            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="

              w-full

              bg-gradient-to-r
              from-blue-500
              to-purple-500

              hover:scale-[1.02]

              text-white

              p-4

              rounded-2xl

              font-bold
              text-lg

              shadow-lg

              transition-all
              duration-300
            "
          >

            Create Invoice

          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateInvoice;