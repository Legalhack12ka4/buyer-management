import React from "react";
import '../index.css';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Buyer Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
