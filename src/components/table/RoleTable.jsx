import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const RoleTable = () => {
  const user = Array(15).fill({
    id: "#01",
    name: "Kamal Sahu",
    role: "Super Admin",
  });
  return (
    <div style={{ width: `calc(100% - 0px)` }}>
      <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10 ">
        <h1>Role</h1>
      </div>
      <div className="max-h-[85vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border-t sticky top-0 ">
            <tr>
              <th className="border font-medium p-2">Id</th>
              <th className="border font-medium p-2">Name</th>
              <th className="border font-medium p-2">Role</th>
              <th className="border font-medium p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={index}>
                <td className="border text-center font-medium p-2">
                  {item.id}
                </td>
                <td className="border font-medium text-center p-2">
                  {item.name}
                </td>
                <td className="border font-medium text-center p-2">
                  {item.role}
                </td>
                <td className="border font-medium text-center p-2">
                  <div className="flex text-white gap-2 justify-center items-center">
                    <span className=" text-[1.5rem] bg-green-500 px-3 py-1 rounded-md">
                      <MdOutlineModeEditOutline />
                    </span>
                    <span className=" text-[1.5rem]  bg-red-500 px-3 py-1 rounded-md">
                      <RiDeleteBin6Line />
                    </span> 
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleTable;
