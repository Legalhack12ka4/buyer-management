import React, { useState, useEffect } from "react";
import { Button, Table, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { fetchBuyers } from "../redux/buyerSlice";
import axios from "axios";
import "../index.css";

const API_URL = "http://localhost:3001/buyers";

const SelectedBuyerDetails = ({ buyer, onUpdate }) => {
  const dispatch = useDispatch();
  const [extraCharges, setExtraCharges] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(buyer?.price || 0);
  const [totalPrice, setTotalPrice] = useState(currentPrice);

  // Add a new extra charge column
  const addCharge = () => {
    const newCharge = { description: `Extra Charge ${extraCharges.length + 1}`, amount: 0 };
    setExtraCharges([...extraCharges, newCharge]);
    updateTotalPrice(currentPrice, [...extraCharges, newCharge]);
  };

  // Update the extra charge or current price
  const updateCharge = (index, value) => {
    const updatedCharges = [...extraCharges];
    updatedCharges[index].amount = value || 0; // Update the amount of the specific charge
    setExtraCharges(updatedCharges);
    updateTotalPrice(currentPrice, updatedCharges);
  };

  // Update the current price
  const updateCurrentPrice = (value) => {
    setCurrentPrice(value);
    updateTotalPrice(value, extraCharges);
  };

  // Recalculate the total price
  // const updateTotalPrice = (basePrice, charges) => {
  //   const totalExtraCharges = charges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0);
  //   setTotalPrice(basePrice + totalExtraCharges);
  // };

  const updateTotalPrice = (basePrice, charges) => {
    const totalExtraCharges = charges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0);
    setTotalPrice(Number(basePrice) + totalExtraCharges); // Ensure totalPrice is a number
  };

  // Save changes to the backend
  const saveChanges = async () => {
    try {
      const updatedBuyer = {
        ...buyer,
        price: totalPrice,
        extraCharges,
        totalPrice,
      };
      await axios.patch(`${API_URL}/${buyer.id}`, updatedBuyer);
      
      // Refresh the global buyer list
      dispatch(fetchBuyers());
      
      // Notify parent to refresh the UI or pass updated buyer back
      if (onUpdate) {
        onUpdate(updatedBuyer);
      }

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    if (buyer) {
      setExtraCharges(buyer.extraCharges || []);
      setCurrentPrice(buyer.price || 0);
      setTotalPrice(buyer.totalPrice || 0);
    }
  }, [buyer]);

  // Define the table columns dynamically
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value, record) => {
        if (record.key === "currentPrice") {
          return (
            <InputNumber
              value={value}
              onChange={(value) => updateCurrentPrice(value)}
              min={0}
            />
          );
        }
        return value;
      },
    },
    ...extraCharges.map((charge, index) => ({
      title: charge.description,
      key: `extraCharge-${index}`,
      dataIndex: `extraCharge-${index}`,
      render: (_, record) => {
        if (record.key === `charge-${index}`) {
          return (
            <InputNumber
              value={charge.amount}
              onChange={(value) => updateCharge(index, value)}
              min={0}
            />
          );
        }
        return null;
      },
    })),
  ];

  // Create the table data source dynamically
  const dataSource = [
    {
      key: "name",
      field: "Name",
      value: buyer.name,
    },
    {
      key: "currentPrice",
      field: "Current Price",
      value: currentPrice,
    },
    ...extraCharges.map((charge, index) => ({
      key: `charge-${index}`,
      field: charge.description,
      value: charge.amount,
    })),
  ];

  if (!buyer) {
    return <p>Select a buyer to view details.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Selected Buyer Details</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
      <div className="mt-4">
        <Button onClick={addCharge} className="mr-2">
          Add Extra Charge
        </Button>
        <Button type="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </div>
      <p className="mt-4">
        {/* <strong>Total Price:</strong> ${totalPrice?.toFixed(2)} */}
        <strong>Total Price:</strong> ${Number(totalPrice).toFixed(2)}
      </p>
    </div>
  );
};

export default SelectedBuyerDetails;

