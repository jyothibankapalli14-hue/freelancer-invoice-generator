import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard({ invoices, clients }) {
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid").length;
  const pendingInvoices = invoices.filter((invoice) => invoice.status === "Pending").length;
  const overdueInvoices = invoices.filter((invoice) => {
    const dueDate = new Date(invoice.dueDate || invoice.invoiceDate || invoice.date);
    return invoice.status !== "Paid" && dueDate < new Date();
  }).length;
  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((total, invoice) => total + Number(invoice.total || invoice.amount || 0), 0);
  const outstandingRevenue = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((total, invoice) => total + Number(invoice.total || invoice.amount || 0), 0);

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = monthLabels.map((label, index) => ({
    month: label,
    revenue: invoices.reduce((sum, invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate || invoice.date);
      return invoiceDate.getMonth() === index && invoiceDate.getFullYear() === new Date().getFullYear()
        ? sum + Number(invoice.total || invoice.amount || 0)
        : sum;
    }, 0),
  }));

  const pieData = [
    { name: "Paid", value: paidInvoices },
    { name: "Pending", value: pendingInvoices },
    { name: "Overdue", value: overdueInvoices },
  ];

  return (
    <div className="text-gray-800 dark:text-white transition-all duration-300">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            View financial highlights, invoice performance, and client activity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-gray-500 dark:text-gray-300">Total Clients</h2>
          <p className="text-4xl font-bold text-sky-600 mt-3">{clients.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-gray-500 dark:text-gray-300">Total Invoices</h2>
          <p className="text-4xl font-bold text-blue-600 mt-3">{totalInvoices}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-gray-500 dark:text-gray-300">Paid</h2>
          <p className="text-4xl font-bold text-green-600 mt-3">{paidInvoices}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-gray-500 dark:text-gray-300">Outstanding</h2>
          <p className="text-4xl font-bold text-rose-600 mt-3">? {outstandingRevenue}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-10">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Revenue Trend</h2>
              <p className="text-gray-500 dark:text-gray-300 mt-1">
                Monthly income for the current year.
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Invoice Status</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#22c55e" : index === 1 ? "#2563eb" : "#ef4444"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300">Overdue Invoices</h3>
          <p className="text-4xl font-bold text-red-500 mt-4">{overdueInvoices}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300">Collected Revenue</h3>
          <p className="text-4xl font-bold text-green-500 mt-4">? {totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300">Pending Payments</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-4">? {outstandingRevenue}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
