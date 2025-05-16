import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4 text-gray-700">
        <Link
          to="/admin"
          className="hover:text-black hover:font-semibold transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="hover:text-black hover:font-semibold transition-colors"
        >
          Users
        </Link>
        <Link
          to="/review"
          className="hover:text-black font-semibold transition-colors"
        >
          Reviews
        </Link>
        <Link
          to="/analytics"
          className="hover:text-black hover:font-semibold transition-colors"
        >
          Analytics
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;