import { useEffect, useState } from "react";

function Profile({ profile, setProfile, user }) {
  const [localProfile, setLocalProfile] = useState(profile);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    setLocalProfile({
      ...localProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLocalProfile({
        ...localProfile,
        logo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(localProfile);
    alert("Profile updated successfully.");
  };

  return (
    <div className="text-gray-800 dark:text-white transition-all duration-300">
      <h1 className="text-3xl font-bold mb-8">Account Profile</h1>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg max-w-3xl">
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div>
            <p className="text-gray-500 dark:text-gray-300 mb-2">Signed in as</p>
            <div className="text-lg font-semibold">{user?.email || "No email"}</div>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-300 mb-2">Your role</p>
            <div className="text-lg font-semibold">{profile.role}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                Name
              </label>
              <input
                name="name"
                value={localProfile.name}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="Freelancer name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                Role
              </label>
              <select
                name="role"
                value={localProfile.role}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <option>Freelancer</option>
                <option>Client</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                GST / VAT Number
              </label>
              <input
                name="gstNumber"
                value={localProfile.gstNumber}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="GST or VAT number"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                Invoice Prefix
              </label>
              <input
                name="invoicePrefix"
                value={localProfile.invoicePrefix}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="INV"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                Default Currency
              </label>
              <select
                name="defaultCurrency"
                value={localProfile.defaultCurrency}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                Default Tax Rate (%)
              </label>
              <input
                type="number"
                name="defaultTaxRate"
                value={localProfile.defaultTaxRate}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="18"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Payment Details
            </label>
            <textarea
              name="paymentDetails"
              value={localProfile.paymentDetails}
              onChange={handleChange}
              className="w-full p-3 rounded-2xl border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Enter your payment instruction or bank details"
              rows="4"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full text-sm text-gray-600 dark:text-gray-300"
            />
            {localProfile.logo && (
              <img
                src={localProfile.logo}
                alt="Logo preview"
                className="mt-4 h-24 w-auto rounded-2xl border border-gray-200 dark:border-slate-700"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-2xl font-semibold"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
