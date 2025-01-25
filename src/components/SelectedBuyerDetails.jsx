import React, { useState } from "react";
import { Button, Table, Input, InputNumber, Space } from "antd";
import { useDispatch } from "react-redux";
import { fetchBuyers } from "../redux/buyerSlice";
import axios from "axios";
import '../index.css';

const API_URL = "http://localhost:3001/buyers";

const SelectedBuyerDetails = ({ buyer }) => {
  const dispatch = useDispatch();
  const [extraCharges, setExtraCharges] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(buyer?.price || 0);
  const [totalPrice, setTotalPrice] = useState(currentPrice);

  const addCharge = () => {
    setExtraCharges([...extraCharges, { description: "", amount: 0 }]);
  };

  const updateCharge = (index, field, value) => {
    const updatedCharges = [...extraCharges];
    updatedCharges[index][field] = value;
    setExtraCharges(updatedCharges);

    // Update total price
    const totalExtraCharges = updatedCharges.reduce(
      (sum, charge) => sum + Number(charge.amount || 0),
      0
    );
    setTotalPrice(currentPrice + totalExtraCharges);
  };

  const saveChanges = async () => {
    try {
      await axios.patch(`${API_URL}/${buyer.id}`, {
        ...buyer,
        extraCharges,
        totalPrice,
      });
      dispatch(fetchBuyers()); // Refresh buyer list
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record, index) => (
        <Input
          value={record.description}
          onChange={(e) =>
            updateCharge(index, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record, index) => (
        <InputNumber
          value={record.amount}
          onChange={(value) => updateCharge(index, "amount", value)}
        />
      ),
    },
  ];

  if (!buyer) {
    return <p>Select a buyer to view details.</p>;
  }

//   return (
//     <div className="mt-6">
//       <h2 className="text-lg font-bold mb-4">Selected Buyer</h2>
//       <p><strong>Name:</strong> {buyer.name}</p>
//       <p><strong>Email:</strong> {buyer.email}</p>
//       <p><strong>Mobile:</strong> {buyer.mobile}</p>
//       <p><strong>Current Price:</strong> ${currentPrice}</p>
//       <Table
//         dataSource={extraCharges}
//         columns={columns}
//         pagination={false}
//         rowKey={(record, index) => index}
//       />
//       <Space className="mt-4">
//         <Button onClick={addCharge}>Add Extra Charge</Button>
//         <Button type="primary" onClick={saveChanges}>
//           Save Changes
//         </Button>
//       </Space>
//       <p className="mt-4"><strong>Total Price:</strong> ${totalPrice}</p>
//     </div>
//   );
return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Selected Buyer Details</h2>
      <p><strong>Name:</strong> {buyer.name}</p>
      <p><strong>Email:</strong> {buyer.email}</p>
      <p><strong>Current Price:</strong> ${currentPrice}</p>
      <Table
        dataSource={extraCharges}
        columns={columns}
        pagination={false}
      />
      <div className="mt-4">
        <Button onClick={addCharge} className="mr-2">
          Add Extra Charge
        </Button>
        <Button type="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </div>
      <p className="mt-4"><strong>Total Price:</strong> ${totalPrice}</p>
    </div>
  );
  

};

export default SelectedBuyerDetails;
