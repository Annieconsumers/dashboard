
const ViewUserDetails = ({ user, onClose }) => {
  console.log(user);

  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] lg:w-[50vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
        <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
          <h3 className="font-bold text-2xl">User Details</h3>
          <button
            onClick={onClose}
            className="bg-red-500 p-2 rounded-lg text-white cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-6 flex flex-col md:flex-row">
          {/* Left Table with Seller Details */}
          <div className="w-full md:w-2/3 pr-4">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">User Id:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.user_id}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Name:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.name}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Email:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Contact:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.phone_number}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">
                    Address Line :
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.address_line}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">City:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.city}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">State:</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {user.state}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">
                    Postal Code:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {" "}
                    {user.postal_code}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col  items-center gap-2 border border-gray-300">
            <span className="font-bold ">Profile Pic</span>
            <img
              src={user.profile_pic_url}
              alt=""
              className="h-50 w-50 border-t border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetails;
