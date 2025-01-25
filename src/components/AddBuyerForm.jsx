import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBuyer } from "../redux/buyerSlice";
import { Input, Button, Select } from "antd";
import '../index.css';

const AddBuyerForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    buyingType: "",
  });

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(addBuyer(formData)); // Dispatch Redux action to add buyer
    setFormData({ name: "", email: "", address: "", mobile: "", buyingType: "" }); // Reset form
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Add Buyer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Details */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input
            placeholder="Enter buyer's name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            placeholder="Enter buyer's email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <Input
            placeholder="Enter buyer's address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mobile No</label>
          <Input
            placeholder="Enter buyer's mobile number"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Buying Type</label>
          <Select
            placeholder="Select buying type"
            value={formData.buyingType}
            onChange={(value) => handleChange("buyingType", value)}
            className="w-full mt-1"
          >
            <Select.Option value="Wholesale">Wholesale</Select.Option>
            <Select.Option value="Retail">Retail</Select.Option>
          </Select>
        </div>
      </div>
      <Button type="primary" htmlType="submit" className="mt-4">
        Add Buyer
      </Button>
    </form>
  );
};

export default AddBuyerForm;
