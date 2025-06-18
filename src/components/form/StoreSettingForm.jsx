// import { useRef, useState } from "react";


// const StoreSettingForm = () => {
//     const [image, setImage] = useState(null);
//       const fileInputRef = useRef(null); // Reference for input
    
//       const handleDragOver = (event) => {
//         event.preventDefault();
//       };
    
//       const handleDrop = (event) => {
//         event.preventDefault();
//         const file = event.dataTransfer.files[0];
//         if (file) {
//           setImage(URL.createObjectURL(file));
//         }
//       };
    
//       const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           setImage(URL.createObjectURL(file));
//         }
//       };
//   return (
//     <div className="py-3 px-5 h-screen bg-gray-200">
//       <form action="" className="p-5 bg-white rounded-xl mt-5">
//         <div className="grid grid-cols-3">
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col">
//               <label htmlFor="" className="font-semibold">
//                 App Name
//               </label>
//               <input
//                 type="text"
//                 className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
//               />
//             </div>
//             <div className="flex flex-col gap-4 max-w-[20vw] ">
//               <label className="font-semibold">Logo</label>
//               <div
//                 className="border-2 border-dashed h-56 bg-white border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {image ? (
//                   <img
//                     src={image}
//                     alt="Preview"
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                 ) : (
//                   <p className="text-gray-500">
//                     Drag & Drop or Click to Upload
//                   </p>
//                 )}
//               </div>
//               {/* Hidden Input for File Upload */}
//               <input
//                 type="file"
//                 className="hidden"
//                 ref={fileInputRef} // Reference input
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col">
//               <label htmlFor="" className="font-semibold">
//                 Support Number
//               </label>
//               <input
//                 type="text"
//                 className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
//               />
//             </div>
//             <div className="flex flex-col max-w-[20vw] ">
//             <div className="flex flex-col gap-4  w-full">
//               <label className="font-semibold">Fssai Lic Image
//               </label>
//               <div
//                 className="border-2 border-dashed h-56 bg-white border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {image ? (
//                   <img
//                     src={image}
//                     alt="Preview"
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                 ) : (
//                   <p className="text-gray-500">
//                     Drag & Drop or Click to Upload
//                   </p>
//                 )}
//               </div>
//               {/* Hidden Input for File Upload */}
//               <input
//                 type="file"
//                 className="hidden"
//                 ref={fileInputRef} // Reference input
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           </div>
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col">
//               <label htmlFor="" className="font-semibold">
//                 Support Email
//               </label>
//               <input
//                 type="text"
//                 className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
//               />
//             </div>
//             <div className="flex flex-col max-w-[20vw] ">
//             <div className="flex flex-col gap-4  w-full">
//               <label className="font-semibold">Panel Login Background Image
//               </label>
//               <div
//                 className="border-2 border-dashed h-56 bg-white border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {image ? (
//                   <img
//                     src={image}
//                     alt="Preview"
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                 ) : (
//                   <p className="text-gray-500">
//                     Drag & Drop or Click to Upload
//                   </p>
//                 )}
//               </div>
//               {/* Hidden Input for File Upload */}
//               <input
//                 type="file"
//                 className="hidden"
//                 ref={fileInputRef} // Reference input
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           </div>
//         </div>
//         <div className="mt-10 flex justify-center ">
         
         
//           <button className="bg-green-700 w-50 h-10 text-white px-2 py-1 rounded-lg ">
//             Update
//           </button>
         
//         </div>
//       </form>
//     </div>
//   );
// };



// export default StoreSettingForm