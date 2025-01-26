import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold"><Link to="/" className="hover:underline">Buyer Management</Link></h1>
          <ul className="flex space-x-6">
            <li>
            <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
            <Link to="/add-buyer" className="hover:underline">
                Add Buyer
              </Link>
            </li>
            {/* <li>
            <Link to="/selected-buyer" className="hover:underline">
                Seleceted list
              </Link>
            </li> */}
            {/* <li>
            <Link to="/export" className="hover:underline">
                Export Data
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
