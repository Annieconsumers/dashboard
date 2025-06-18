import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";

const ManagePromoCodeTable = () => {
     const user = Array(15).fill({
        id: "#01",
        promo_code: '50% off',
        messagge: "buy 1 get 1",
        start_date: "01/01/2001",
        end_date: "01/01/2001",
        no_of_users: "20",
        minimum_order_amt: 5000,
        discount: 50,
        discount_type: "default",
      });
  return (
    <div style={{ width: `calc(100% - 0px)` }}>
          <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 ">
            <h1>Manage Promo Code</h1>
          </div>
          <div className="max-h-[75vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border-t sticky top-0 ">
            <tr>
              <th className="border font-medium p-2">Id</th>
              <th className="border font-medium p-2">Promo Code</th>
              <th className="border font-medium p-2">Mesage</th>
              <th className="border font-medium p-2">Start Date</th>
              <th className="border font-medium p-2">End Date</th>
              <th className="border font-medium p-2">Number of Users</th>
              <th className="border font-medium p-2">Minimum Order Amount</th>
              <th className="border font-medium p-2">Discount</th>
              <th className="border font-medium p-2">Discount Type</th>
              <th className="border font-medium p-2">Status</th>
              <th className="border font-medium p-2">Validity</th>
              <th className="border font-medium p-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={index}>
                <td className="border text-center font-medium p-2">{item.id}</td>
                <td className="border p-2 text-center m-0 font-semibold ">
                  {item.promo_code}
                </td>
                <td className="border font-medium text-center p-2">
                 {item.messagge}
                </td>
                <td className="border font-medium text-center p-2">{item.start_date}</td>
                <td className="border font-medium text-center p-2">{item.end_date}</td>
                <td className="border font-medium text-center p-2">{item.no_of_users}</td>
                <td className="border font-medium text-center p-2">{item.minimum_order_amt}</td>
                <td className="border font-medium text-center p-2">{item.discount}</td>
                <td className="border font-medium text-center p-2">{item.discount_type}</td>  
                <td className="border font-medium text-center p-2">Active</td>  
                <td className="border font-medium text-center p-2">Acceptable</td>  

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


export default ManagePromoCodeTable