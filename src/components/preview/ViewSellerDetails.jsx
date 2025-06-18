import React from "react";
import Carousel from "../ui/Carousel";

const ViewSellerDetails = ({ seller, onClose }) => {
  const seller_images = [
    seller?.profile_urls,
    seller?.aadhaar_urls[0],
    seller?.aadhaar_urls[1],
    seller?.address_doc_url,
    seller?.bank_doc_url,
  ];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] lg:w-[70vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
      <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
        <h3 className="font-bold text-2xl">Seller Details</h3>
        <button
          onClick={onClose}
          className="bg-red-500 p-2 rounded-lg text-white cursor-pointer"
        >
          Close
        </button>
      </div>

      <div className="overflow-y-auto max-h-[70vh]  flex flex-col md:flex-row ">
        {/* Left Table with Seller Details */}
        <div className="w-full md:w-1/2 pr-2">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Seller Id</th>
                <td className="border-gray-300 border p-2 px-4">{seller.id}</td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Seller Name
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.seller_name}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Seller Email
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.seller_email}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Seller Contact
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.seller_contact}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Aadhaar Number
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller?.aadhaar_number}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Seller Address
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.address_line_1}, {seller.seller_city},{" "}
                  {seller?.seller_district}, {seller.seller_state},{" "}
                  {seller.seller_postal_code}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Segment</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.segment}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Store Name</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.store_name}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">GST Type</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.gst_type}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">GST Number</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.gst_number}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">PAN Number</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.business_pan_number}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Store Address
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.address_line_1}, {seller.store_city},{" "}, {seller?.store_district}
                  {seller.store_state}, {seller.store_postal_code}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Section with Images and Store Info */}
        <div className="w-full md:w-1/2 pl-2">
          <div className="flex justify-center border border-gray-300 ">
            <Carousel image={seller_images} />
          </div>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Store Landmark
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.store_landmark}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Store Latitude & Longitude
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.latitude}, {seller.longitude}
                </td>
              </tr>

              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Account Holder Name
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.bank_account_name}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Bank Name</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.bank_name}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Account No</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.account_number}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">IFSC Code</th>
                <td className="border-gray-300 border p-2 px-4">
                  {seller.bank_ifsc_code}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSellerDetails;
