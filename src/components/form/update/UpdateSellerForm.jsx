import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sellerUpdate } from "../../../redux/slices/sellerSlice";
import { IoIosCamera } from "react-icons/io";

const UpdateSellerForm = ({ seller, onClose }) => {
  const bankDocRef = useRef(null);
  const storeAddressRef = useRef(null);
  const [updateData, setUpdateData] = useState({
    id: seller.id,
    segment: seller.segment,
    ifsc_code: seller.bank_ifsc_code,
    ac_holder_name: seller.bank_account_name,
    ac_number: seller.account_number,
    bank_name: seller.bank_name,
    bank_doc_url: seller.bank_doc_url || null,
    prev_bank_doc_url: seller.bank_doc_url || null,
    store_address_line: seller.address_line_1,
    store_city: seller.store_city,
    store_landmark: seller.store_landmark,
    store_district: seller.store_district,
    store_state: seller.store_state,
    store_postal_code: seller.store_postal_code,
    store_address_url: seller.address_doc_url,
    prev_store_address_url: seller.address_doc_url,
    latitude: seller.latitude,
    longitude: seller.longitude,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) {
      toast.warn("Please uplaod a valid file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.warn("File size must be less than 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (name === "bank_doc_url") {
      setUpdateData((prev) => ({
        ...prev,
        bank_doc_url: file,
        prev_bank_doc_url: previewUrl,
      }));
    }
    if (name === "store_address_url") {
      setUpdateData((prev) => ({
        ...prev,
        store_address_url: file,
        prev_store_address_url: previewUrl,
      }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, fieldName) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (!file) {
      toast.warn("Please upload a valid file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.warn("File size must be less than 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (fieldName === "bank_doc_url") {
      setUpdateData((prev) => ({
        ...prev,
        bank_doc_url: file,
        prev_bank_doc_url: previewUrl,
      }));
    } else if (fieldName === "store_address_url") {
      setUpdateData((prev) => ({
        ...prev,
        store_address_url: file,
        prev_store_address_url: previewUrl,
      }));
    } else {
      toast.warn("Unsupported drop field.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateData);
    dispatch(sellerUpdate(updateData));
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] lg:w-[70vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
      <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center z-50">
        <h3 className="font-bold text-2xl">Update Seller Details</h3>
        <button
          onClick={onClose}
          className="bg-red-500 p-2 rounded-lg text-white cursor-pointer"
        >
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="overflow-y-auto max-h-[70vh] p-6 flex flex-col md:flex-row ">
          {/* Left Table with Seller Details */}
          <div className="w-full md:w-1/2 pr-4 ">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Seller Id:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.id}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Seller Name:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.seller_name}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Seller Email:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.seller_email}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Seller Contact:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.seller_contact}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200 ">
                    Aadhaar No:
                  </th>
                  <td className="border-gray-300  border p-2 px-4">
                    {seller.aadhaar_number}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Seller Address:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.address_line_1}, {seller.seller_city},{" "}
                    {seller.seller_district}, {seller.seller_state},{" "}
                    {seller.seller_postal_code}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Segment:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    <select
                      name="segment"
                      value={updateData.segment}
                      onChange={handleChange}
                      id=""
                    >
                      <option value="mart">Mart</option>
                      <option value="restaurant">Restaurent</option>
                      <option value="salon">Salon</option>
                      <option value="gym">Gym</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store Name:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.store_name}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    GST Type:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.gst_type}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    GST Number:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.gst_number}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    PAN Number:
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {seller.business_pan_number}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store Address:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="store_address_line"
                      value={updateData.store_address_line}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store City:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="store_city"
                      value={updateData.store_city}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Lati & Long:
                  </th>
                  <td className="border-gray-300 border-r border-b p-2 px-4">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="latitude"
                        value={updateData.latitude}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="longitude"
                        value={updateData.longitude}
                        onChange={handleChange}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Section with Images and Store Info */}
          <div className="w-full md:w-1/2 pl-4">
            <div className="justify-center border border-gray-300 mb-6 grid grid-cols-2 z-10">
              <div className="flex flex-col items-center">
                <span className="font-bold">Bank Document</span>
                <div
                  className="h-48 w-62 relative border-2 border-dashed border-gray-400 hover:border-red-500 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "bank_doc_url")}
                  onClick={() => bankDocRef.current.click()}
                >
                  {updateData.prev_bank_doc_url ? (
                    <>
                      <img
                        src={updateData.prev_bank_doc_url}
                        className="h-full w-full object-cover"
                        alt="preview"
                      />
                      <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm">
                        <IoIosCamera size={20} /> Update
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center px-4">
                      Drag & Drop or Click to Upload
                    </p>
                  )}
                </div>

                <input
                  name="bank_doc_url"
                  type="file"
                  className="hidden"
                  ref={bankDocRef}
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-bold">Address Document</span>
                <div
                  className="h-48 w-62 relative border-2 border-dashed border-gray-400 hover:border-red-500 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "store_address_url")}
                  onClick={() => storeAddressRef.current.click()}
                >
                  {updateData.prev_store_address_url ? (
                    <>
                      <img
                        src={updateData.prev_store_address_url}
                        className="h-full w-full object-cover"
                        alt="preview"
                      />
                      <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm">
                        <IoIosCamera size={20} /> Update
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center px-4">
                      Drag & Drop or Click to Upload
                    </p>
                  )}
                </div>

                <input
                  name="store_address_url"
                  type="file"
                  className="hidden"
                  ref={storeAddressRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store Landmark:
                  </th>
                  <td className="border-gray-300 border-r border-t p-2 px-4">
                    <input
                      type="text"
                      name="store_landmark"
                      value={updateData.store_landmark}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store District:
                  </th>
                  <td className="border-gray-300 border-r  p-2 px-4">
                    <input
                      type="text"
                      name="store_district"
                      value={updateData.store_district}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store State:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="store_state"
                      value={updateData.store_state}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Store State:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="store_postal_code"
                      value={updateData.store_postal_code}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Account Holder Name:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="ac_holder_name"
                      value={updateData.ac_holder_name}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Bank Name:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="text"
                      name="bank_name"
                      value={updateData.bank_name}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Account No:
                  </th>
                  <td className="border-gray-300 border-r p-2 px-4">
                    <input
                      type="number"
                      name="ac_number"
                      value={updateData.ac_number}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    IFSC Code:
                  </th>
                  <td className="border-gray-300 border-r border-b p-2 px-4">
                    <input
                      type="text"
                      name="ifsc_code"
                      value={updateData.ifsc_code}
                      onChange={handleChange}
                      className="border p-1"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-full w-full flex my-3">
          <button
            type="submit"
            className=" px-4 py-2 rounded-lg bg-green-600 m-auto font-semibold text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSellerForm;
