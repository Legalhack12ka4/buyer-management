// import React from "react";
// import { Button, Space } from "antd";
// import { useSelector } from "react-redux";
// import * as XLSX from "xlsx";
// import '../index.css';

// const ExportAndEmail = () => {
//   const buyers = useSelector((state) => state.buyers.data);

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(buyers);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
//     XLSX.writeFile(workbook, "buyers_data.xlsx");
//   };

//   const attachToEmail = () => {
//     exportToExcel();
//     alert("Excel file exported. Please attach it manually to your email client.");
//   };

//   return (
//     <Space className="mt-6">
//       <Button type="primary" onClick={exportToExcel}>
//         Export to Excel
//       </Button>
//       <Button onClick={attachToEmail}>
//         Attach to Email
//       </Button>
//     </Space>
//   );
// };

// export default ExportAndEmail;


import React from "react";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import '../index.css';

const ExportAndEmail = () => {
  const buyers = useSelector((state) => state.buyers.data);

  // Function to flatten each buyer object, including extraCharges
  const flattenBuyerData = (buyer) => {
    let flattened = {
      id: buyer.id,
      name: buyer.name,
      email: buyer.email,
      address: buyer.address,
      price: buyer.price,
      mobile: buyer.mobile,
      buyingType: buyer.buyingType,
      totalPrice: buyer.totalPrice,
    };

    // Flatten extra charges dynamically
    buyer.extraCharges.forEach((charge, index) => {
      flattened[`extraCharge${index + 1}_description`] = charge.description;
      flattened[`extraCharge${index + 1}_amount`] = charge.amount;
    });

    return flattened;
  };

  // Function to export buyers to Excel
  const exportToExcel = () => {
    // Flatten all buyers' data
    const flattenedBuyers = buyers.map(flattenBuyerData);

    // Create a worksheet from the flattened data
    const worksheet = XLSX.utils.json_to_sheet(flattenedBuyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
    XLSX.writeFile(workbook, "buyers_data.xlsx");
  };

  // Function to export to Excel and notify about email attachment
  const attachToEmail = () => {
    exportToExcel();
    alert("Excel file exported. Please attach it manually to your email client.");
  };

  return (
    <Space>
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
