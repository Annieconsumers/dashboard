import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterWithOtp, VerifyOtp } from "../../redux/slices/authSlice";
import { getSellerSectionWise } from "../../redux/slices/sellerSlice";
import {
  gym_employee_designation,
  mart_employee_designation,
  restaurant_employee_designation,
  salon_employee_designation,
} from "../../constant/employee_designation";
import bank_name from "../../constant/bank_name";
import { createEmployee } from "../../redux/slices/employeeSlice";
import { checkExistingEmployee } from "../../redux/api/employeeApi";
import { toast } from "react-toastify";

const AddEmployee = () => {

  const designationMap = {
    mart: mart_employee_designation,
    salon: salon_employee_designation,
    gym: gym_employee_designation,
    restaurant: restaurant_employee_designation,
  };

  const dispatch = useDispatch();
  const { otpSent, otpVerified } = useSelector((state) => state.auth);
  const { sellers } = useSelector((state) => state.seller);
  console.log(sellers);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    section: "",
    seller_id: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    dateOfBirth: "",
    profile_image: null,
    bank_name: "",
    bank_account_name: "",
    bank_ifsc: "",
    account_no: "",
    aadhar_no: "",
    pan_no: "",
    passbook_image: null,
    aadhar_image: [],
    panCard_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "profile_image") {
      setFormData((prev) => ({
        ...prev,
        profile_image: file,
      }));
    }

    // Handle aadhar_urls[0], aadhar_urls[1], etc.
    const aadharMatch = name.match(/aadhar_image\[(\d+)\]/);
    if (aadharMatch) {
      const index = parseInt(aadharMatch[1], 10);
      setFormData((prev) => {
        const newAadhar = [...prev.aadhar_image];
        newAadhar[index] = file;
        return {
          ...prev,
          aadhar_image: newAadhar,
        };
      });
    }

    if (name === "panCard_image") {
      setFormData((prev) => ({
        ...prev,
        panCard_image: file,
      }));
    }

    if (name === "passbook_image") {
      setFormData((prev) => ({
        ...prev,
        passbook_image: file,
      }));
    }
  };

  const handleSendOtp = async () => {
    const phone_no = phone.slice(-10);

    if (phone.length !== 10) {
      alert("Phone Number should be 10 digits");
      return;
    }

    const existing = await checkExistingEmployee(phone_no);
    if (existing && existing.length > 0) {
      console.log("Employee already exists:", existing);
      // alert("Employee Already Exist");
      toast.warn("Employee Already Exist");
    } else {
      await dispatch(RegisterWithOtp(phone_no));
      console.log("New Employee — continue with registration");
    }
  };

  const handleVerifyOtp = async () => {
    console.log(phone);

    const result = await dispatch(
      VerifyOtp({ phoneNumber: phone, token: otp })
    );
    if (VerifyOtp.rejected.match(result)) {
      // ❌ OTP failed (wrong or expired)
      alert(`OTP verification failed: ${result.payload}`);
    } else {
      // ✅ OTP verified successfully
      alert("OTP verified successfully!");
    }
  };

  const handleClear = () => {
    setFormData({
      section: "",
      seller_id: "",
      name: "",
      email: "",
      phone: "",
      designation: "",
      address: "",
      dateOfBirth: "",
      profile_image: null,
      bank_name: "",
      bank_account_name: "",
      bank_ifsc: "",
      account_no: "",
      aadhar_no: "",
      pan_no: "",
      passbook_image: null,
      aadhar_image: [],
      panCard_image: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createEmployee(formData));
    handleClear()
  };

  return (
    <div className=" bg-gray-300 h-screen overflow-auto ">
      <div className="">
        <h1 className="text-3xl font-bold p-5"> Create Employee</h1>
      </div>
      <div className="mt-5 ">
        <form>
          <div className="mt-5 bg-white m-5 rounded-lg px-10 py-5 flex gap-10 items-end">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={(e) => {
                  handleChange(e); // update local form data
                  dispatch(getSellerSectionWise(e.target.value)); // dispatch Redux action
                }}
                className="bg-gray-300 rounded-lg h-10 w-40 p-2"
              >
                <option value="">Select</option>
                <option value="mart">Mart</option>
                <option value="restaurant">Restaurant</option>
                <option value="gym">Gym</option>
                <option value="salon">Salon</option>
              </select>
            </div>

            {formData.section && (
              <div className="flex flex-col">
                <label className="text-lg font-semibold">Seller</label>
                <select
                  name="seller_id"
                  value={formData.seller_id}
                  onChange={handleChange}
                  id=""
                  className="bg-gray-300 rounded-lg h-10 w-60 p-2"
                >
                  <option value="">select</option>
                  {sellers.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.id.slice(0, 8)} ({item.seller_name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.seller_id && (
              <div className="flex flex-col">
                <label className="text-lg font-semibold">
                  {" "}
                  Phone No.(for OTP){" "}
                </label>
                <div className="flex items-center border rounded-lg border-gray-500">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-gray-300 rounded-l-lg h-10 w-50 p-2 no-arrows"
                    placeholder="Enter Phone No."
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-gray-500 h-10 w-22 rounded-r-lg cursor-pointer text-white font-semibold"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            )}
            {otpSent && (
              <div className="">
                <input
                  type="text"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  className="rounded-l-lg pl-2 py-2 bg-gray-200"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white h-10 w-22  rounded-r-lg text-center font-semibold"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>

          {otpVerified && (
            <div className="flex flex-col w-full gap-6 justify-center px-5">
              <div className="p-10 bg-white rounded-lg">
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Name</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold pl-3">Email</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold pl-3">Mobile No.</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="number"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold pl-3">
                      Designation (Role){" "}
                    </label>

                    <select
                      name="designation"
                      onChange={handleChange}
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
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

                    {errors.designation && (
                      <p className="text-red-500 text-sm">
                        {errors.designation}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold pl-3">Date Of Birth </label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Address</label>
                    <textarea
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="address"
                      onChange={handleChange}
                      value={formData.address}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>

                  <div className="flex flex-col font-semibold">
                    <label className="font-semibold pl-3">Photo</label>
                    <input
                      type="file"
                      name="profile_image"
                      onChange={handleImageChange}
                      className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 w-75 bg-gray-200 "
                    />
                    {errors.profile_image && (
                      <p className="text-red-500 text-sm">
                        {errors.profile_image}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-lg">
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Aadhar No.</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="aadhar_no"
                      onChange={handleChange}
                      value={formData.aadhar_no}
                    />
                    {errors.aadhar_no && (
                      <p className="text-red-500 text-sm">{errors.aadhar_no}</p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Pan No.</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="pan_no"
                      onChange={handleChange}
                      value={formData.pan_no}
                    />
                    {errors.pan_no && (
                      <p className="text-red-500 text-sm">{errors.pan_no}</p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">
                      Bank Account No.
                    </label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="account_no"
                      onChange={handleChange}
                      value={formData.account_no}
                    />
                    {errors.account_no && (
                      <p className="text-red-500 text-sm">
                        {errors.account_no}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">
                      Bank Holder Name
                    </label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="bank_account_name"
                      onChange={handleChange}
                      value={formData.bank_account_name}
                    />
                    {errors.bank_account_name && (
                      <p className="text-red-500 text-sm">
                        {errors.bank_account_name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Bank IFSC Code</label>
                    <input
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                      type="text"
                      name="bank_ifsc"
                      onChange={handleChange}
                      value={formData.bank_ifsc}
                    />
                    {errors.bank_ifsc && (
                      <p className="text-red-500 text-sm">{errors.bank_ifsc}</p>
                    )}
                  </div>

                  <div className="flex flex-col ">
                    <label className="font-semibold pl-3">Bank Name</label>
                    <select
                      name="bank_name"
                      id=""
                      value={formData.bank_name}
                      onChange={handleChange}
                      className="bg-gray-300 rounded-lg h-10 w-75 pl-3"
                    >
                      {" "}
                      <option value=" ">Select</option>
                      <option value="">Select</option>
                      {bank_name.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                    {errors.bank_name && (
                      <p className="text-red-500 text-sm">{errors.bank_name}</p>
                    )}
                  </div>

                  <div className="flex flex-col font-semibold">
                    <label className="font-semibold pl-3">
                      Aadhar Image (Front)
                    </label>
                    <input
                      type="file"
                      name="aadhar_image[0]"
                      onChange={handleImageChange}
                      className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 w-75 bg-gray-200"
                    />
                    {errors.aadhar_image && (
                      <p className="text-red-500 text-sm">
                        {errors.aadhar_image[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col font-semibold">
                    <label className="font-semibold pl-3">
                      Aadhar Image(Back)
                    </label>
                    <input
                      type="file"
                      name="aadhar_image[1]"
                      onChange={handleImageChange}
                      className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 w-75 bg-gray-200"
                    />
                    {errors.aadhar_image && (
                      <p className="text-red-500 text-sm">
                        {errors.aadhar_image[1]}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col font-semibold">
                    <label className="font-semibold pl-3">PanCard Image </label>
                    <input
                      type="file"
                      name="panCard_image"
                      onChange={handleImageChange}
                      className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 w-75 bg-gray-200"
                    />
                    {errors.panCard_image && (
                      <p className="text-red-500 text-sm">
                        {errors.panCard_image}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col font-semibold">
                    <label className="font-semibold pl-3">
                      Bank PassBook Image{" "}
                    </label>
                    <input
                      type="file"
                      name="passbook_image"
                      onChange={handleImageChange}
                      className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 w-75 bg-gray-200"
                    />
                    {errors.passbook_image && (
                      <p className="text-red-500 text-sm">
                        {errors.passbook_image}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-10 pb-6 m-auto">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-600 w-90 h-10 rounded-full text-white font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  //   onClick={handleClear}
                  className="w-90 h-10 bg-red-500 rounded-full text-white font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
