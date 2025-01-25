import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddBuyerForm from "./components/AddBuyerForm";
import BuyerTable from "./components/BuyerTable";
import SelectedBuyerDetails from "./components/SelectedBuyerDetails";
import ExportAndEmail from "./components/ExportAndEmail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { fetchBuyers } from "./redux/buyerSlice";
import './index.css'

const App = () => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBuyers());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <section id="add-buyer">
            <AddBuyerForm />
          </section>
          <section id="buyer-table">
            <BuyerTable onSelect={setSelectedBuyer} />
          </section>
          <section id="selected-buyer">
            <SelectedBuyerDetails buyer={selectedBuyer} />
          </section>
          <section id="export">
            <ExportAndEmail />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
