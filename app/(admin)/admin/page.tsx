"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, MessageSquare, Users, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  // Dummy stats for UI
  const stats = [
    { title: "Total Projects", value: "12", icon: <FolderKanban size={20} />, color: "text-blue-600" },
    { title: "Inquiries", value: "48", icon: <MessageSquare size={20} />, color: "text-emerald-600" },
    { title: "Clients", value: "08", icon: <Users size={20} />, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm"
          >
            <div className={`p-3 w-fit rounded-2xl bg-gray-50 dark:bg-zinc-800 mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-sm font-semibold text-gray-500 dark:text-zinc-400">{stat.title}</p>
            <h3 className="text-3xl font-bold mt-1 dark:text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Messages Section */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 dark:text-white">Recent Inquiries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 text-sm text-gray-400 font-medium">
                <th className="pb-4">Name</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: "Rahul Das", service: "Web Dev", status: "New", date: "2 mins ago" },
                { name: "Anjali Nair", service: "UI/UX", status: "Read", date: "1 hour ago" },
                { name: "Suresh", service: "E-commerce", status: "Replied", date: "Yesterday" },
              ].map((msg, idx) => (
                <tr key={idx} className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0">
                  <td className="py-4 font-bold dark:text-zinc-200">{msg.name}</td>
                  <td className="py-4 text-gray-500 dark:text-zinc-400">{msg.service}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      msg.status === 'New' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">{msg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}