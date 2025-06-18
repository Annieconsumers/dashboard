// import { FaRegCheckCircle } from "react-icons/fa";
// import { MdOutlineCancel } from "react-icons/md";
// import { IoDocumentSharp } from "react-icons/io5";

// const DeliveryBoyCashTable = () => {
//      const user = Array(15).fill({
//         id: "#01",
//         name: "lorem",
//         mobile: "91236547",
//         order_id: "#01",
//         amount: "300",
//         type: "COD",
//         message: "Deliver Boy delivered this order, order method was COD" ,
//         date_time: "01/01/2001; 23:59:11",
//       });
//   return (
//     <div style={{ width: `calc(100% - 0px)` }}>
//           <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10 ">
//             <h1>Delivery Boy Cash Collection</h1>
//           </div>
//           <div className="max-h-[75vh] overflow-y-auto">
//         <table className="w-full product-table border-collapse">
//           <thead className="bg-gray-200 border-t sticky top-0 ">
//             <tr>
//               <th className="border font-medium p-2">Id</th>
//               <th className="border font-medium p-2">Name</th>
//               <th className="border font-medium p-2">Mobile</th>
//               <th className="border font-medium p-2">Order ID</th>
//               <th className="border font-medium p-2">Amount()</th>
//               <th className="border font-medium p-2">Type</th>
//               <th className="border font-medium p-2">Message</th>
//               <th className="border font-medium p-2">Date & Time</th>

//             </tr>
//           </thead>
//           <tbody>
//             {user.map((item, index) => (
//               <tr key={index}>
//                 <td className="border text-center font-medium p-2">{item.id}</td>
//                 <td className="border p-2 text-center m-0 font-semibold ">
//                   {item.name}
//                 </td>
//                 <td className="border font-medium text-center p-2">
//                  +91 {item.mobile}
//                 </td>
//                 <td className="border font-medium text-center p-2">
//                  +91 {item.order_id}
//                 </td>
//                 <td className="border font-medium text-center p-2">{item.amount}</td>
//                 <td className="border font-medium text-center p-2">{item.type}</td>
//                 <td className="border font-medium text-center p-2">{item.message}</td>
//                 <td className="border font-medium text-center p-2">{item.date_time}</td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
       
//       </div>
//         </div>
//   )
// }




// export default DeliveryBoyCashTable