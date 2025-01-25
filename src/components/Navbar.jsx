import React from "react";
import '../index.css';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Buyer Management</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#add-buyer" className="hover:underline">
                Add Buyer
              </a>
            </li>
            <li>
              <a href="#export" className="hover:underline">
                Export Data
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
