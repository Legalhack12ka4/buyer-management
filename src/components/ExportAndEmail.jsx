import React from "react";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import '../index.css';

const ExportAndEmail = () => {
  const buyers = useSelector((state) => state.buyers.data);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(buyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
    XLSX.writeFile(workbook, "buyers_data.xlsx");
  };

  const attachToEmail = () => {
    exportToExcel();
    alert("Excel file exported. Please attach it manually to your email client.");
  };

  return (
    <Space className="mt-6">
      <Button type="primary" onClick={exportToExcel}>
        Export to Excel
      </Button>
      <Button onClick={attachToEmail}>
        Attach to Email
      </Button>
    </Space>
  );
};

export default ExportAndEmail;
