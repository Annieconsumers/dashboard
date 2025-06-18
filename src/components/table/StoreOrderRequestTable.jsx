import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";


const StoreOrderRequestTable = () => {
     const user = Array(15).fill({
        seller_id: "01",
        store_name: 'lorem lorem',
        product_name: "large Brown egg",
        price: "5000",
        discounted_price: "3000" ,
        measurement: "packet",
      });
  return (
    <div style={{ width: `calc(100% - 0px)` }}>
          <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
            <h1>Store Order Request</h1>
          </div>
          <div className="max-h-[75vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border-t sticky top-0 ">
            <tr>
              <th className="border font-medium p-2">Seller Id</th>
              <th className="border font-medium p-2">Store name</th>
              <th className="border font-medium p-2">Product Name</th>
              <th className="border font-medium p-2">Price (₹)</th>
              <th className="border font-medium p-2">Discounted Price (₹)</th>
              <th className="border font-medium p-2">Measurement</th>
              <th className="border font-medium p-2">Stock</th>
              <th className="border font-medium p-2">Status</th>
              <th className="border font-medium p-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={index}>
                <td className="border text-center font-medium p-2">{item.seller_id}</td>
                <td className="border p-2 text-center m-0 font-semibold ">
                  {item.store_name}
                </td>
                <td className="border font-medium text-center p-2">
                  {item.product_name}
                </td>
                <td className="border font-medium text-center p-2">{item.price}</td>
                <td className="border font-medium text-center p-2">{item.discounted_price}</td>
                <td className="border p-2 text-center font-semibold">
                   {item.measurement}
                </td>
                <td className="border p-2 text-center font-semibold">
                  20
                </td>
                <td className="border p-2 text-center ">
                  <p className="bg-green-300 rounded-full">Available</p>{" "}
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

export default StoreOrderRequestTable