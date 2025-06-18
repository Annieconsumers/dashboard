// import { FaRegCheckCircle } from "react-icons/fa";
// import { MdOutlineCancel } from "react-icons/md";

// const ManageNotificationsTable = () => {
//   const user = Array(15).fill({
//     id: "#01",
//     type: "Default",
//     name: "Baverages Corner",
//     position: "Below Category",
//   });
//   return (
//     <div style={{ width: `calc(100% - 0px)` }}>
//       <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10 ">
//         <h1>Manage Notifications</h1>
//       </div>
//       <div className="max-h-[75vh] overflow-y-auto">
//         <table className="w-full product-table border-collapse">
//           <thead className="bg-gray-200 border-t sticky top-0 ">
//             <tr>
//               <th className="border font-medium p-2">Id</th>
//               <th className="border font-medium p-2">Title</th>
//               <th className="border font-medium p-2">Message</th>
//               <th className="border font-medium p-2">Type</th>
//               <th className="border font-medium p-2">Id</th>
//               <th className="border font-medium p-2">Link</th>
//               <th className="border font-medium p-2">Image</th>
//               <th className="border font-medium p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {user.map((item, index) => (
//               <tr key={index}>
//                 <td className="border text-center font-medium p-2">
//                   {item.id}
//                 </td>
//                 <td className="border font-medium text-center p-2">
//                   {item.type}
//                 </td>
//                 <td className="border p-2 text-center m-0 font-semibold "> </td>
//                 <td className="border p-2 text-center m-0 font-semibold "> </td>
//                 <td className="border p-2 text-center m-0 font-semibold "> </td>
//                 <td className="border p-2 text-center m-0 font-semibold "> </td>                
//                 <td className="border font-medium text-center p-2">
//                   <img
//                     src=""
//                     alt=""
//                     className="w-20 h-10 border inline-block"
//                   />
//                 </td>
//                 <td className="border p-2 text-center ">
//                   <div className="flex gap-1 justify-center items-center">
//                     <span className=" text-[1.5rem] bg-green-500 rounded-full">
//                       <FaRegCheckCircle />
//                     </span>
//                     <span className=" text-[1.8rem]  bg-red-500 rounded-full">
//                       <MdOutlineCancel />
//                     </span>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageNotificationsTable;
