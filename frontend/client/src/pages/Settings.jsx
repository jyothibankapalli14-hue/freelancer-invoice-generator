function Settings({

  darkMode,
  setDarkMode,

  setInvoices,

  companyInfo,
  setCompanyInfo,

}) {

  // Clear All Invoices
  const clearInvoices = () => {

    const confirmDelete =
      window.confirm(
        "Delete all invoices?"
      );

    if (confirmDelete) {

      localStorage.removeItem("invoices");

      setInvoices([]);
    }
  };

  return (

    <div className="text-gray-800 dark:text-white transition-all duration-300">

      <h1 className="text-3xl font-bold mb-8">

        Settings

      </h1>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-2xl">

        {/* Theme */}
        <div className="flex justify-between items-center border-b dark:border-slate-600 pb-5 mb-5">

          <div>

            <h2 className="text-xl font-semibold">

              Theme Mode

            </h2>

            <p className="text-gray-500 dark:text-gray-300">

              Switch between dark and light mode

            </p>

          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >

            {darkMode
              ? "Light"
              : "Dark"}

          </button>

        </div>

        {/* Company Details */}
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">

    Company Details

  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Company Name"
      value={companyInfo.companyName}
      onChange={(e) =>
        setCompanyInfo({
          ...companyInfo,
          companyName: e.target.value,
        })
      }
      className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
    />

    <input
      type="email"
      placeholder="Email"
      value={companyInfo.email}
      onChange={(e) =>
        setCompanyInfo({
          ...companyInfo,
          email: e.target.value,
        })
      }
      className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
    />

    <input
      type="text"
      placeholder="Phone"
      value={companyInfo.phone}
      onChange={(e) =>
        setCompanyInfo({
          ...companyInfo,
          phone: e.target.value,
        })
      }
      className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
    />

    <textarea
      placeholder="Company Address"
      value={companyInfo.address}
      onChange={(e) =>
        setCompanyInfo({
          ...companyInfo,
          address: e.target.value,
        })
      }
      className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
    />

  </div>

</div>

        

        {/* Clear Invoices */}
        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold">

              Clear All Invoices

            </h2>

            <p className="text-gray-500 dark:text-gray-300">

              Remove all saved invoices

            </p>

          </div>

          <button
            onClick={clearInvoices}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >

            Clear

          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;