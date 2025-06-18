import React, { useEffect, useState } from "react";
import {
  User,
  FileText,
  CreditCard,
  Truck,
  Award,
  CheckCircle,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSeller } from "../../redux/slices/sellerSlice";

const ViewDeliveryBoyRequests = ({ deliveryBoy, onClose }) => {
  const {sellers} = useSelector((state)=> state.seller)
  console.log(sellers);
  
  const dispatch = useDispatch()
  // console.log(deliveryBoy);
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
   dispatch(getSingleSeller(deliveryBoy.seller_id))
  }, [dispatch])
  

  const tabData = [
    {
      id: "Profile",
      image: deliveryBoy.profile_image_url,
      title: "Profile Photo",
      icon: <User size={16} />,
    },
    {
      id: "Aadhaar Front",
      image: deliveryBoy.aadhaar_image_url[0],
      title: "Aadhaar Card Front",
      icon: <FileText size={16} />,
    },
    {
      id: "Aadhaar Back",
      image: deliveryBoy.aadhaar_image_url[1],
      title: "Aadhaar Card Back",
      icon: <FileText size={16} />,
    },
    {
      id: "Passbook",
      image: deliveryBoy.bank_passbook_image_url,
      title: "Bank Passbook",
      icon: <CreditCard size={16} />,
    },
    {
      id: "License",
      image: deliveryBoy.driving_license_image_url,
      title: "Driving License",
      icon: <FileText size={16} />,
    },
    {
      id: "PAN",
      image: deliveryBoy.pan_image_url,
      title: "PAN Card",
      icon: <CreditCard size={16} />,
    },
    {
      id: "RC",
      image: deliveryBoy.rc_image_url,
      title: "Registration Certificate",
      icon: <FileText size={16} />,
    },
  ];

  const activeImage =
    tabData.find((tab) => tab.id === activeTab)?.image ||
    "/api/placeholder/400/300";
  const activeTitle =
    tabData.find((tab) => tab.id === activeTab)?.title || activeTab;

  return (
    <div className="fixed bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto shadow-2xl top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2 z-50">
      {/* Header*/}
      <div className="bg-gradient-to-r from-red-400 to-red-500 sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b border-orange-300">
        <h3 className="font-bold text-2xl text-white flex items-center gap-2">
          <Truck className="text-white" />
          Delivery Boy Details
        </h3>
        <button
          onClick={onClose}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
          aria-label="Close"
        >
          <X size={25} className="text-black font-bold" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-2/5">
            <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md mb-4 p-3">
              <div className="aspect-w-4 aspect-h-3 mb-2 flex justify-center items-center">
                <div className="h-64 flex items-center justify-center bg-white rounded border border-gray-100 overflow-hidden">
                  <img
                    src={activeImage || "/api/placeholder/400/300"}
                    alt={activeTitle}
                    className="max-h-64 max-w-full object-contain"
                  />
                </div>
              </div>
              <h4 className="text-center font-medium text-gray-700 mt-2">
                {activeTitle}
              </h4>
            </div>

            {/*  tab navigation */}
            <div className="bg-gray-100 rounded-lg p-2 mb-6">
              <div className="grid grid-cols-2 gap-2">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1.5
                                                ${
                                                  activeTab === tab.id
                                                    ? "bg-white text-orange-600 shadow-sm border border-orange-100"
                                                    : "text-gray-600 hover:bg-gray-200"
                                                }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    {tab.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Details */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-amber-500 pl-3 flex items-center gap-2">
                <Truck size={18} className="text-amber-500" />
                Vehicle & Status Details
              </h4>
              <table className="border-collapse bg-white rounded-lg overflow-hidden shadow-md w-full">
                <tbody>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Vehicle Type
                    </th>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800">
                      {deliveryBoy.vehicle_type}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Vehicle No.
                    </th>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                      {deliveryBoy.vehicle_number}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Driving License No.
                    </th>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                      {deliveryBoy.driving_license_number}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      RC No.
                    </th>
                    <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                      {deliveryBoy.rc_number}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Rating
                    </th>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className="bg-yellow-100 text-yellow-800 font-medium px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                        <Award size={16} />
                        {deliveryBoy.rating} ★
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Status
                    </th>
                    <td className="border border-gray-200 px-4 py-3">
                      {deliveryBoy.is_active === true ? (
                        <span className="bg-green-100 text-green-800 font-medium px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                          <CheckCircle size={16} />
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 font-medium px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                          <X size={16} />
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                      Verification
                    </th>
                    <td className="border border-gray-200 px-4 py-3">
                      {deliveryBoy.is_verified === true ? (
                        <span className="bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                          <CheckCircle size={16} />
                          Verified
                        </span>
                      ) : (
                        <span className="bg-orange-100 text-orange-800 font-medium px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                          <X size={16} />
                          Not Verified
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Details section */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 gap-6">
              {/* Personal Details  */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-blue-500 pl-3 flex items-center gap-2">
                  <User size={18} className="text-blue-500" />
                  Personal Information
                </h4>
                <table className="border-collapse bg-white rounded-lg overflow-hidden shadow-md mb-6 w-full">
                  <tbody>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Name
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.full_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        ID
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.id}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Phone
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.phone_number}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Email
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.email}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Address
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* seller Details  */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-amber-700 pl-3 flex items-center gap-2">
                  <User size={18} className="text-amber-700" />
                  Seller Information
                </h4>
                <table className="border-collapse bg-white rounded-lg overflow-hidden shadow-md mb-6 w-full">
                  <tbody>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Name
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {sellers[0]?.seller_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        ID
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.seller_id}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Phone
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {sellers[0]?.seller_contact}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Section
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.section}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ID and Bank Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-green-500 pl-3 flex items-center gap-2">
                  <FileText size={18} className="text-green-500" />
                  Identity & Bank Details
                </h4>
                <table className="border-collapse bg-white rounded-lg overflow-hidden shadow-md w-full">
                  <tbody>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Aadhaar No.
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.aadhaar_number}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        PAN No.
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.pan_number}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Account No.
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.account_number}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Account Holder
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.bank_account_name}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        Bank Name
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800">
                        {deliveryBoy.bank_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-200 px-4 py-3 text-left text-gray-600 font-semibold">
                        IFSC Code
                      </th>
                      <td className="border border-gray-200 px-4 py-3 text-gray-800 font-mono">
                        {deliveryBoy.ifsc_code}
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeliveryBoyRequests;
