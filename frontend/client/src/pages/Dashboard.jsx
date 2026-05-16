import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ invoices }) {

  // Total Invoices
  const totalInvoices = invoices.length;

  // Paid Invoices
  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  // Pending Invoices
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  // Total Revenue
  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce(
      (total, invoice) =>
        total + Number(invoice.amount),
      0
    );

  // Chart Data
  const data = [
    {
      name: "Paid",
      value: paidInvoices,
    },

    {
      name: "Pending",
      value: pendingInvoices,
    },
  ];

  // Chart Colors
  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (

    <div className="text-gray-800 dark:text-white transition-all duration-300">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">

        Dashboard

      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Total Invoices */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500 dark:text-gray-300">

            Total Invoices

          </h2>

          <p className="text-4xl font-bold text-blue-500 mt-3">

            {totalInvoices}

          </p>

        </div>

        {/* Paid Invoices */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500 dark:text-gray-300">

            Paid Invoices

          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">

            {paidInvoices}

          </p>

        </div>

        {/* Pending Invoices */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500 dark:text-gray-300">

            Pending Invoices

          </h2>

          <p className="text-4xl font-bold text-red-500 mt-3">

            {pendingInvoices}

          </p>

        </div>

        {/* Revenue */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-500 dark:text-gray-300">

            Revenue

          </h2>

          <p className="text-4xl font-bold text-purple-500 mt-3">

            ₹ {totalRevenue}

          </p>

        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">

          Invoice Analytics

        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Dashboard;