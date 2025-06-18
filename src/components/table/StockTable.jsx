import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../../redux/slices/StockManagementSlice";
import DataTable from "react-data-table-component";

const StockTable = () => {
  const [requestInput, setRequestInput] = useState(0)

  const {stocks } = useSelector((state) => state.stock)
  console.log(stocks);

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getStock())
  }, [dispatch])
  
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
    },
    {
      name: "Seller Id",
      selector: (row) => row.seller_id,
      
    },
    {
      name: "Store Name",
      selector: (row) => row.store_name,
      
    },
    {
      name: "Product",
      selector: (row) => row.product_name,
    },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
    },
    {
      name: "Seller",
      selector: (row) => row.seller_name,
    },
    {
      name: "Available",
      selector: (row) => row.available,
    },
    {
      name: "Requested",
      selector: (row) => row.request_stock,
      width: "130px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      width: "400px",

    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      width: "170px"
    },
    {
      name: "Update",
      selector: (row) => row.updated_at,
      width: "170px"
    },
  ];

  const data = stocks.map((item, index) => ({
    serialNo: index + 1,
    seller_id: (item.seller_id).slice(0, 8),
    store_name: item.sellers.store_name,
    product_name: item.mart_products.name,
    total_amount: item.mart_products.price,
    seller_name: item.sellers.users.name,
    available: item.available_stock,
    request_stock: <input type="number" value={item ? item.request_stock : requestInput } onChange={(e)=> setRequestInput(e.target.value)} className=" border w-15" />,
    address: <div>{item.sellers.address_line_1}, {item.sellers.store_city}</div>,
    contact: item.sellers.users.phone_number
  }));

  const customStyles = {
    headCells: {
      style: {
        borderBottom: "1px solid black", // Bottom border for header cells
        borderRight: "1px solid gray", // Right border for header cells
        backgroundColor: "#f4f4f4", // Light gray background
        fontWeight: "bold",
        borderTop: "1px solid black",
        justifyContent: "center",
        fontSize: '15px'
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
          justifyContent: "center",
          fontSize: '15px'
        },
      },
    },
    tableWapper:{
      style:{
        borderBottom: "1px solid gray"
      }
    }
  };

 

  return (
    <div style={{ width: `calc(100% - 0px)` }}>
      <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
        <h1>Stock Management</h1>
      </div>
      <div className="max-h-[75vh] max-w-[81vw]"> 
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          // fixedHeaderScrollHeight="67vh"
          // pagination
          defaultSortFieldId={1}
        />
      </div>
    </div>
  );
};

export default StockTable;
