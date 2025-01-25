// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Table } from 'antd';
// import '../index.css';

// const BuyerTable = ({ onSelect }) => {
//   const buyers = useSelector((state) => state.buyers.data);

//   const columns = [
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
//     { title: 'Buying Type', dataIndex: 'buyingType', key: 'buyingType' },
//   ];

//   const rowSelection = {
//     type: 'radio',
//     onChange: (selectedRowKeys, selectedRows) => {
//       onSelect(selectedRows[0]);
//     },
//   };

// return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Buyer List</h2>
//       <Table
//         dataSource={buyers}
//         columns={columns}
//         rowSelection={{
//           type: "radio",
//           onChange: (_, selectedRows) => {
//             onSelect(selectedRows[0]);
//           },
//         }}
//         pagination={{ pageSize: 5 }}
//       />
//     </div>
//   );
  
// };

// export default BuyerTable;


import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import '../index.css';

const BuyerTable = ({ onSelect }) => {
  const buyers = useSelector((state) => state.buyers.data);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Buying Type', dataIndex: 'buyingType', key: 'buyingType' },
  ];

  const [selectedRowKey, setSelectedRowKey] = React.useState(null); // Track selected row

  const rowSelection = {
    type: 'radio', // Ensure radio selection mode
    selectedRowKeys: [selectedRowKey], // Bind the selected row
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]); // Update the selected row
      onSelect(selectedRows[0]); // Pass the selected row data to the parent
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buyer List</h2>
      <Table
        dataSource={buyers}
        columns={columns}
        rowSelection={rowSelection} // Use the defined rowSelection
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default BuyerTable;
