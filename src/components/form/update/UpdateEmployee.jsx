import { useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import bank_name from "../../../constant/bank_name";
import FloatingLabelInput from "../../atoms/FloatingLabelInput";
import {
  gym_employee_designation,
  mart_employee_designation,
  restaurant_employee_designation,
  salon_employee_designation,
} from "../../../constant/employee_designation";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../../redux/slices/employeeSlice";

const UpdateEmployee = ({ employee, onClose }) => {
  const designationMap = {
    mart: mart_employee_designation,
    salon: salon_employee_designation,
    gym: gym_employee_designation,
    restaurant: restaurant_employee_designation,
  };

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    section: employee?.section,
    seller_id: employee?.seller_id,

    id: employee?.id,
    name: employee?.name,
    email: employee?.email,
    phone: employee?.phone,
    address: employee?.address,
    dateOfBirth: employee?.date_of_birth,
    designation: employee?.role,
    aadhaar_number: employee?.aadhaar_number,
    pan_no: employee?.pan_number,
    bank_name: employee?.bank_name,
    bank_account_name: employee?.account_holder_name,
    bank_ifsc: employee?.ifsc_code,
    account_no: employee?.bank_account_number,
    profile_image: null,
    old_profile_image: employee?.profile_image_url,
    passbook_image: null,
    old_passbook: employee?.passbook_image_url,
    aadhar_image: [],
    old_aadhaar_image: employee?.aadhaar_image_urls,
    panCard_image: null,
    old_pan_card: employee?.pan_card_image_url,
  });

  const [profileImagePreview, setProfileImagePreview] = useState(
    employee?.profile_image_url
  );

  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(
    employee?.aadhaar_image_urls?.[0]
  );
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState(
    employee?.aadhaar_image_urls?.[1]
  );
  const [panImagePreview, setPanImagePreview] = useState(
    employee?.pan_card_image_url
  );
  const [bankImagePreview, setBankImagePreview] = useState(
    employee?.passbook_image_url
  );

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    await dispatch(updateEmployee(formData));
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
                value={formData.phone || ""}
              />
              <FloatingLabelInput
                type="text"
                label="Email"
                field="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <div className=" flex gap-1">
                <FloatingLabelInput
                  type="date"
                  label="Date of Birth"
                  field="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="rounded-lg w-full p-2 mb-4 border"
                />
                <FloatingLabelInput
                  label="Section"
                  type="text"
                  disabled
                  value={formData.section}
                  className="rounded-lg w-full p-2 mb-4 border"
                />
                <select
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  className="rounded-lg w-full p-2 mb-4 border"
                >
                  <option value="">Select</option>
                  {(designationMap[formData.section] || []).map(
                    (role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex gap-2">
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
                  field="pan_no"
                  value={formData.pan_no || ""}
                  onChange={handleChange}
                />
              </div>
              <FloatingLabelInput
                type="text"
                label="Address"
                field="address"
                value={formData.address || ""}
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
                field="account_no"
                value={formData.account_no || ""}
                onChange={handleChange}
              />
              <FloatingLabelInput
                type="text"
                label="IFSC Code"
                field="bank_ifsc"
                value={formData.bank_ifsc || ""}
                onChange={handleChange}
              />
            </div>
            <div className="w-[40vw] h-50  border-3 relative border-gray-500 rounded-lg border-dashed hover:border-red-600 ">
              <img
                src={bankImagePreview}
                alt="Passbook"
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
      <div className="flex gap-10 items-center justify-around p-4 mb-6 border-b-2 w-full bg-gray-200 ">
        {["Personal Information", "Bank Information"].map((label, index) => (
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
        {step < 2 && (
          <button
            onClick={handleNext}
            className="bg-blue-500 cursor-pointer text-white rounded-md px-4 py-2"
          >
            Next
          </button>
        )}
        {step === 2 && (
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

export default UpdateEmployee;
