function Settings({ darkMode, setDarkMode, companyInfo, setCompanyInfo }) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCompanyInfo({ ...companyInfo, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const clearCompanyInfo = () => {
    if (window.confirm("Reset company details to default?")) {
      setCompanyInfo({
        companyName: "Freelancer Invoice",
        email: "support@invoiceapp.com",
        phone: "+91 9876543210",
        address: "Vizag, Andhra Pradesh",
        gstNumber: "",
        logo: "",
        paymentUrl: "https://stripe.com",
      });
    }
  };

  return (
    <div className="text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center border-b dark:border-slate-600 pb-5 mb-5">
            <div>
              <h2 className="text-xl font-semibold">Theme Mode</h2>
              <p className="text-gray-500 dark:text-gray-300">Switch between dark and light mode.</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-2xl"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Company Details</h2>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="GST / VAT Number"
                value={companyInfo.gstNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, gstNumber: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <input
                type="url"
                placeholder="Payment URL"
                value={companyInfo.paymentUrl}
                onChange={(e) => setCompanyInfo({ ...companyInfo, paymentUrl: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
              <textarea
                placeholder="Billing Address"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                rows="4"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Upload Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-sm text-gray-600 dark:text-gray-300" />
              {companyInfo.logo && (
                <img src={companyInfo.logo} alt="Logo preview" className="mt-4 h-24 w-auto rounded-2xl border border-slate-200 dark:border-slate-700" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Restore Defaults</h2>
          <p className="text-gray-500 dark:text-gray-300 mb-6">Reset the company profile and settings to their default values.</p>
          <button
            onClick={clearCompanyInfo}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-2xl"
          >
            Reset Company Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
