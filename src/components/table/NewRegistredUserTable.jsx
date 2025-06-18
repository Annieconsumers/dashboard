import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";


const NewRegisteredUserTable = () => {
     const user = Array(15).fill({
        seller_id: "01",
        seller_info: 'lorem lorem',
        store_info: "dcmart",
        categoty: "Dairy and bakery",
        address: "bhuj gujarat india" ,
        other_info: "Tester",
      });
  return (
    <div style={{ width: `calc(100% - 0px)` }}>
          <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
            <h1>New Registered User</h1>
          </div>
          <div className="max-h-[75vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border-t sticky top-0 ">
            <tr>
              <th className="border font-medium p-2">Seller Id</th>
              <th className="border font-medium p-2">Seller info</th>
              <th className="border font-medium p-2">Store info</th>

              <th className="border font-medium p-2">Category</th>
              <th className="border font-medium p-2">Address</th>
              <th className="border font-medium p-2">Other info</th>
              <th className="border font-medium p-2">Commission (%)</th>
              <th className="border font-medium p-2">Date</th >
              <th className="border font-medium p-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={index}>
                <td className="border text-center font-medium p-2">{item.seller_id}</td>
                <td className="border p-2 text-center m-0 font-semibold ">
                  {item.seller_info}
                </td>
                <td className="border font-medium text-center p-2">
                  {item.store_info}
                </td>
                <td className="border font-medium text-center p-2">{item.categoty}</td>
                <td className="border font-medium text-center p-2">{item.address}</td>
                <td className="border p-2 text-center font-semibold">
                   {item.other_info}
                </td>
                <td className="border p-2 text-center font-semibold">
                  10%
                </td>
                <td className="border p-2 text-center font-semibold">
                  10/10/2020
                </td>
                <td className="border p-2 text-center ">
                  <div className="flex gap-1 justify-center items-center">
                    <span className=" text-[1.5rem] bg-green-500 rounded-full"><FaRegCheckCircle/></span>
                    <span className=" text-[1.8rem]  bg-red-500 rounded-full"><MdOutlineCancel /></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
  )
}

export default NewRegisteredUserTable

// import React, { useState } from 'react'

// const NewRegistredUserTable = () => {
//   const [totalAmount, setTotalAmount] = useState("");
//   const [taxRate, setTaxRate] = useState(0);
//   const [basePrice, setBasePrice] = useState(0);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);

//   const handleCalculate = () => {
//     const total = parseFloat(totalAmount);
//     const taxFraction = taxRate / 100;

//     // For inclusive tax: Base price = Total / (1 + tax%)
//     const base = total / (1 + taxFraction);
//     const totalTax = total - base;
//     const halfTax = totalTax / 2;

//     setBasePrice(base.toFixed(2));
//     setCgst(halfTax.toFixed(2));
//     setSgst(halfTax.toFixed(2));
//   };
//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//     <h2>Inclusive Tax Calculator</h2>

//     <div>
//       <label>Total Amount (incl. tax):</label><br />
//       <input
//         type="number"
//         value={totalAmount}
//         onChange={(e) => setTotalAmount(e.target.value)}
//         placeholder="Enter total amount"
//       />
//     </div>

//     <div style={{ marginTop: 10 }}>
//       <label>Select Tax Rate:</label><br />
//       <select value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value))}>
//         <option value={0}>0%</option>
//         <option value={5}>5%</option>
//         <option value={12}>12%</option>
//         <option value={18}>18%</option>
//       </select>
//     </div>

//     <button style={{ marginTop: 15 }} onClick={handleCalculate}>
//       Calculate Tax
//     </button>

//     {basePrice > 0 && (
//       <div style={{ marginTop: 20 }}>
//         <p><strong>Base Price (excl. tax):</strong> ₹{basePrice}</p>
//         <p><strong>CGST:</strong> ₹{cgst}</p>
//         <p><strong>SGST:</strong> ₹{sgst}</p>
//       </div>
//     )}
//   </div>
//   )
// }

// export default NewRegistredUserTable