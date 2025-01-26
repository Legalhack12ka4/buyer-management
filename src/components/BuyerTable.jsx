import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Input, Space, message, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { deleteBuyer, fetchBuyers } from "../redux/buyerSlice";
import "../index.css";
import SelectedBuyerDetails from "./SelectedBuyerDetails";
import ExportAndEmail from "./ExportAndEmail";

const BuyerTable = () => {
  const buyers = useSelector((state) => state.buyers.data);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredBuyers, setFilteredBuyers] = useState(buyers);

  // Handle buyer updates
  const handleBuyerUpdate = (updatedBuyer) => {
    dispatch(fetchBuyers());
    if (selectedBuyer?.id === updatedBuyer.id) {
      setSelectedBuyer(updatedBuyer);
    }
  };

  // Handle delete for multiple selected rows
  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRowKeys) {
        await dispatch(deleteBuyer(id)).unwrap();
      }
      message.success("Selected buyers deleted successfully");
      setSelectedRowKeys([]);
      setSelectedBuyer(null);
    } catch (error) {
      message.error("Failed to delete selected buyers");
    }
  };

  // Handle delete for a single row
  const handleDeleteSingle = async (id) => {
    try {
      await dispatch(deleteBuyer(id)).unwrap();
      message.success("Buyer deleted successfully");
      if (selectedBuyer?.id === id) {
        setSelectedBuyer(null);
      }
    } catch (error) {
      message.error("Failed to delete buyer");
    }
  };

  // Handle row selection
  const handleRowSelectionChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const firstSelectedBuyer = buyers.find((buyer) => buyer.id === newSelectedRowKeys[0]);
    setSelectedBuyer(firstSelectedBuyer || null);
  };

  // Export table data to Excel
  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(
  //     filteredBuyers.map((buyer) => ({
  //       Name: buyer.name,
  //       Email: buyer.email,
  //       Mobile: buyer.mobile,
  //       Price: buyer.price,
  //       "Buying Type": buyer.buyingType,
  //     }))
  //   );
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
  //   XLSX.writeFile(workbook, "buyers_data.xlsx");
  // };

  // Search buyers by name or email
  const handleSearch = (value) => {
    setSearchText(value);
    const searchValue = value.toLowerCase();
    const results = buyers.filter(
      (buyer) =>
        buyer.name.toLowerCase().includes(searchValue) ||
        buyer.email.toLowerCase().includes(searchValue)
    );
    setFilteredBuyers(results);
  };

  // Update filtered buyers when Redux data changes
  React.useEffect(() => {
    setFilteredBuyers(buyers);
  }, [buyers]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        ...new Set(buyers.map((buyer) => buyer.name)),
      ].map((name) => ({ text: name, value: name })),
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Buying Type",
      dataIndex: "buyingType",
      key: "buyingType",
      filters: [
        { text: "Wholesale", value: "Wholesale" },
        { text: "Retail", value: "Retail" },
      ],
      onFilter: (value, record) => record.buyingType === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this buyer?"
          onConfirm={() => handleDeleteSingle(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buyer List</h2>
      <Space className="mb-4 flex justify-between w-full">
        <Input
          placeholder="Search by Name or Email"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
        <Space>
          <Button
            type="primary"
            danger
            onClick={handleDeleteSelected}
            disabled={selectedRowKeys.length === 0}
          >
            Delete Selected
          </Button>
          <ExportAndEmail/>
        </Space>
      </Space>
      <Table
        dataSource={filteredBuyers.map((buyer) => ({
          ...buyer,
          key: buyer.id,
        }))}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelectionChange,
        }}
        pagination={{ pageSize: 5 }}
      />
      {selectedBuyer && (
        <div className="mt-6">
          <SelectedBuyerDetails buyer={selectedBuyer} onUpdate={handleBuyerUpdate} />
        </div>
      )}
    </div>
  );
};

export default BuyerTable;
