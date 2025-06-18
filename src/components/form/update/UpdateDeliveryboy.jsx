import React, { useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import FloatingLabelInput from "../../atoms/FloatingLabelInput";
import bank_name from "../../../constant/bank_name";
import { useDispatch } from "react-redux";
import { updateDeliveryBoy } from "../../../redux/slices/deliveryBoySlice";

const UpdateDeliveryboy = ({ deliveryBoy, onClose }) => {
  console.log(deliveryBoy);

  const dispatch = useDispatch()

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    section: deliveryBoy?.section,
    seller_id: deliveryBoy?.seller_id,
    // personalInfo: {
    id: deliveryBoy.id,
    name: deliveryBoy.full_name,
    contact: deliveryBoy.phone_number,
    email: deliveryBoy?.email,
    address: deliveryBoy?.address,
    aadhaar_number: deliveryBoy?.aadhaar_number,
    pan_number: deliveryBoy?.pan_number,
    // },
    // vehicleInfo: {
    vehicle_type: deliveryBoy?.vehicle_type,
    vehicle_number: deliveryBoy?.vehicle_number,
    rc_number: deliveryBoy?.rc_number,
    driving_license_number: deliveryBoy?.driving_license_number,
    // },
    // bankInfo: {
    bank_name: deliveryBoy?.bank_name,
    bank_account_name: deliveryBoy?.bank_account_name,
    account_number: deliveryBoy?.account_number,
    ifsc_code: deliveryBoy?.ifsc_code,
    // },

    // Add image file fields
    profile_image: null,
    old_profile_pic: deliveryBoy?.profile_image_url,
    aadhaar_image_front: null,
    old_aadhaar_front: deliveryBoy?.aadhaar_image_url?.[0],
    aadhaar_image_back: null,
    old_aadhaar_back: deliveryBoy?.aadhaar_image_url?.[1],
    panCard_image: null,
    old_panCard:deliveryBoy?.pan_image_url,
    driving_license_image: null,
    old_driving_license: deliveryBoy?.driving_license_image_url,
    rc_image: null,
    old_rc: deliveryBoy?.rc_image_url,
    passbook_image: null,
    old_passbook:deliveryBoy?.bank_passbook_image_url
  });

  const [profileImagePreview, setProfileImagePreview] = useState(
    deliveryBoy?.profile_image_url
  );
  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(
    deliveryBoy?.aadhaar_image_url?.[0]
  );
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState(
    deliveryBoy?.aadhaar_image_url?.[1]
  );
  const [panImagePreview, setPanImagePreview] = useState(
    deliveryBoy?.pan_image_url
  );
  const [drivingLicenseImagePreview, setDrivingLicenseImagePreview] = useState(
    deliveryBoy?.driving_license_image_url
  );
  const [rcImagePreview, setRcImagePreview] = useState(
    deliveryBoy?.rc_image_url
  );
  const [bankImagePreview, setBankImagePreview] = useState(
    deliveryBoy?.bank_passbook_image_url
  );

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async() => {
    console.log("Form submitted:", formData);
    await dispatch(updateDeliveryBoy(formData))
    onClose()
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <FloatingLabelInput
              disabled
                type="text"
                label="Id"
                field="id"
                value={formData.id || ""}
              />
              <FloatingLabelInput
                type="text"
                label="Name"
                field="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="number"
                label="Contact"
                field="contact"
                value={formData.contact || ""}
              />
              <FloatingLabelInput
                type="text"
                label="Email"
                field="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="Address"
                field="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="number"
                label="Aadhaar number"
                field="aadhaar_number"
                value={formData.aadhaar_number || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="Pan number"
                field="pan"
                value={formData.pan_number || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-2 space-y-5">
                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaUser size={20} /> Profile Picture
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProfileImagePreview(URL.createObjectURL(file));
                          setFormData((prev) => ({
                            ...prev,
                            profile_image: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={aadhaarFrontPreview}
                    alt="Aadhaar Front"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaAddressCard size={20} /> Aadhaar Front
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAadhaarFrontPreview(URL.createObjectURL(file));
                          setFormData((prev) => ({
                            ...prev,
                            aadhaar_image_front: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={aadhaarBackPreview}
                    alt="Aadhaar Back"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaAddressCard size={20} /> Aadhaar Back
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAadhaarBackPreview(URL.createObjectURL(file));
                          setFormData((prev) => ({
                            ...prev,
                            aadhaar_image_back: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={panImagePreview}
                    alt="PAN"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaAddressCard size={20} /> PAN Card
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setPanImagePreview(URL.createObjectURL(file));
                          setFormData((prev) => ({
                            ...prev,
                            panCard_image: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <FloatingLabelInput
                type="text"
                label="vehicle type"
                field="vehicle_type"
                value={formData.vehicle_type || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="vehicle number"
                field="vehicle_number"
                value={formData.vehicle_number || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="rc number"
                field="rc_number"
                value={formData.rc_number || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="driving license number"
                field="driving_license_number"
                value={formData.driving_license_number || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-2 space-y-4">
                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={drivingLicenseImagePreview}
                    alt="driving license"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaUser size={20} /> Driving License
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setDrivingLicenseImagePreview(
                            URL.createObjectURL(file)
                          );
                          setFormData((prev) => ({
                            ...prev,
                            driving_license_image: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="w-60 h-50 border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600">
                  <img
                    src={rcImagePreview}
                    alt="RC"
                    className="pt-7 object-cover h-full w-full"
                  />
                  <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                    <FaUser size={20} /> RC Image
                  </p>
                  <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                    <IoIosCamera size={20} /> Update
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setRcImagePreview(URL.createObjectURL(file));
                          setFormData((prev) => ({
                            ...prev,
                            rc_image: file,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <select
                field="bank_name"
                id=""
                value={formData.bank_name}
                onChange={(e) => handleChange("bank_name", e.target.value)}
                className="rounded-lg w-full p-2 mb-3 border"
              >
                <option value="">Select</option>
                {bank_name.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>

              <FloatingLabelInput
                type="text"
                label="Account Holder name"
                field="bank_account_name"
                value={formData.bank_account_name || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="number"
                label="account number"
                field="account_number"
                value={formData.account_number || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="IFSC Code"
                field="ifsc_code"
                value={formData.ifsc_code || ""}
                onChange={handleChange}
              />
            </div>
            <div className="w-[40vw] h-50  border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600 ">
              <img
                src={bankImagePreview}
                alt="RC"
                className="pt-7 object-cover h-full w-full"
              />
              <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 w-full rounded flex items-center gap-2 justify-center text-sm">
                <FaUser size={20} /> Bank Passbook
              </p>
              <label className="cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200/75 px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-800 hover:text-gray-200">
                <IoIosCamera size={20} /> Update
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setBankImagePreview(URL.createObjectURL(file));
                      setFormData((prev) => ({
                        ...prev,
                        passbook_image: file,
                      }));
                    }
                  }}
                />
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-1/2 right-1/2 bg-white transition translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-auto rounded-md shadow-md overflow-hidden z-50 p-3 flex flex-col items-center">
      <div className="flex gap-10 items-center justify-between mb-6 border-b-2 p-3 w-full">
        {[
          "Personal Information",
          "Vehicle Information",
          "Bank Information",
        ].map((label, index) => (
          <div key={index} className="flex gap-1 items-center">
            <p
              className={`h-7 w-7 rounded-full border text-center ${
                step === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </p>
            <button
              type="button"
              className={`${
                step === index + 1 ? "font-bold" : ""
              } cursor-pointer`}
              onClick={() => setStep(index + 1)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      {renderStepContent()}

      <div className="flex gap-4 mt-4">
        <button
          onClick={onClose}
          className="bg-red-500 cursor-pointer text-white rounded-md px-4 py-2"
        >
          Close
        </button>
        {step > 1 && (
          <button
            onClick={handleBack}
            className="bg-gray-500 cursor-pointer text-white rounded-md px-4 py-2"
          >
            Prev
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="bg-blue-500 cursor-pointer text-white rounded-md px-4 py-2"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateDeliveryboy;
