import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerRegister } from "../../redux/slices/sellerSlice";

import { checkExistingSeller } from "../../redux/api/sellerApi";
import { toast } from "react-toastify";
import stateDistricts from "../../constant/state-district";
import bank_name from "../../constant/bank_name";

const AddSellerForm = () => {
  const dispatch = useDispatch();
  const { otpSent, otpVerified } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState(""); // seller's phone
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    const phone_no = phone.slice(-10);

    if (phone.length !== 10) {
      alert("Phone Number should be 10 digits");
    }

    const existing = await checkExistingSeller(phone_no);
    if (existing && existing.length > 0) {
      console.log("Seller already exists:", existing);
      alert("Seller Already Exist");
      toast.warn("Seller Already Exist");
    } else {
      await dispatch(RegisterWithOtp(phone_no));
      console.log("New seller — continue with registration");
    }
  };

  const handleVerifyOtp = async () => {
    console.log(phone);

    const result = await dispatch(
      sellerVerifyOtp({ phoneNumber: phone, token: otp })
    );
    if (sellerVerifyOtp.rejected.match(result)) {
      // ❌ OTP failed (wrong or expired)
      alert(`OTP verification failed: ${result.payload}`);
    } else {
      // ✅ OTP verified successfully
      alert("OTP verified successfully!");
    }
  };

  const [sellerInfo, setSellerInfo] = useState({
    seller_name: "",
    seller_email: "",
    seller_contact: phone,
    seller_address: "",
    seller_city: "",
    seller_district: "",
    seller_state: "",
    seller_postal_code: "",
    profile_pic: "",
    aadhaar_no: "",
    aadhaar_urls: [],
  });

  const [storeInfo, setStoreInfo] = useState({
    store_name: "",
    sagment: "",
    business_pan_number: "",
    gst_type: "",
    gst_number: "",
    address_line_1: "",
    store_landmark: "",
    store_city: "",
    store_district: "",
    store_state: "",
    store_postal_code: "",
    store_address_url: "",
    store_latitude: "",
    store_longitude: "",
    address_document: "",
  });

  const [bankInfo, setbankInfo] = useState({
    bank_name: "",
    account_number: "",
    confirm_ac_no: "",
    bank_ifsc_code: "",
    bank_account_name: "",
    bank_document: "",
  });

  const validation = () => {
    let newErrors = {};

    // Seller Info validations
    if (!(sellerInfo.seller_name || "").trim())
      newErrors.seller_name = "Name is required.";

    if (!(sellerInfo.seller_email || "").trim())
      newErrors.seller_email = "Email is required.";

    if (!(sellerInfo.seller_contact || "").trim()) {
      newErrors.seller_contact = "Phone number is required.";
    } else if ((sellerInfo.seller_contact || "").length !== 10) {
      newErrors.seller_contact = "Phone number should be 10 digits.";
    }

    if (!(sellerInfo.seller_address || "").trim())
      newErrors.seller_address = "Address is required.";

    if (!(sellerInfo.seller_city || "").trim())
      newErrors.seller_city = "City is required.";

    if (!(sellerInfo.seller_district || "").trim())
      newErrors.seller_district = "District is required.";

    if (!(sellerInfo.seller_state || "").trim())
      newErrors.seller_state = "State is required.";

    if (!(sellerInfo.seller_postal_code || "").trim())
      newErrors.seller_postal_code = "Postal Code is required.";

    if (sellerInfo.seller_postal_code.length !== 6)
      newErrors.seller_postal_code = "Postal Code should be 6 digit.";

    if (!sellerInfo.profile_pic)
      newErrors.profile_pic = "Profile picture is required.";

    if (!(sellerInfo.aadhaar_no || "").trim()) {
      newErrors.aadhaar_no = "Aadhaar number is required.";
    } else if ((sellerInfo.aadhaar_no || "").length !== 12) {
      newErrors.aadhaar_no = "Aadhaar number should be 12 digits.";
    }

    if (!sellerInfo.aadhaar_urls[0])
      newErrors.aadhaar_urls = {
        ...(newErrors.aadhaar_urls || {}),
        0: "Aadhaar front is required.",
      };

    if (!sellerInfo.aadhaar_urls[1])
      newErrors.aadhaar_urls = {
        ...(newErrors.aadhaar_urls || {}),
        ...newErrors.aadhaar_urls,
        1: "Aadhaar back is required.",
      };

    // Store Info validations
    if (!(storeInfo.store_name || "").trim())
      newErrors.store_name = "Store Name is required.";

    if (!(storeInfo.sagment || "").trim())
      newErrors.sagment = "Store Segment is required.";

    if (!(storeInfo.business_pan_number || "").trim())
      newErrors.business_pan_number = "Business PAN number is required.";

    if (!(storeInfo.gst_type || "").trim())
      newErrors.gst_type = "GST Type is required.";

    if ((storeInfo.gst_number || "").length !== 15)
      newErrors.gst_number = "GST number should be 15 digits.";

    if (!(storeInfo.address_line_1 || "").trim())
      newErrors.address_line_1 = "Store address is required.";

    if (!(storeInfo.store_city || "").trim())
      newErrors.store_city = "Store City is required.";

    if (!(storeInfo.store_district || "").trim())
      newErrors.store_district = "Please select Store district .";

    if (!(storeInfo.store_state || "").trim())
      newErrors.store_state = "Store state is required.";

    if ((storeInfo.store_postal_code || "").length !== 6)
      newErrors.store_postal_code = "Postal code should be 6 digits.";

    if (!(storeInfo.store_latitude || "").trim())
      newErrors.store_latitude = "Store latitude is required.";

    if (!(storeInfo.store_longitude || "").trim())
      newErrors.store_longitude = "Store longitude is required.";

    // Bank Info validations

    if (
      (bankInfo.account_number || "").trim() !==
      (bankInfo.confirm_ac_no || "").trim()
    ) {
      newErrors.confirm_ac_no = "Account numbers do not match.";
    }

    if (!bankInfo.bank_name) newErrors.bank_name = "Select bank name.";

    if (!(bankInfo.account_number || "").trim())
      newErrors.account_number = "Accunt Number is required.";

    if (!(bankInfo.bank_ifsc_code || "").trim())
      newErrors.bank_ifsc_code = "IFSC code is required.";

    if ((bankInfo.bank_ifsc_code || "").length !== 11)
      newErrors.bank_ifsc_code = "Enter 11 digit valid IFSC Code.";

    if (!(bankInfo.bank_account_name || "").trim())
      newErrors.bank_account_name = "Account Holder name is required.";

    if (!bankInfo.bank_document)
      newErrors.bank_document = "bank document is required.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(sellerInfo.seller_district);
    console.log(sellerInfo.seller_state);
    console.log(storeInfo.store_district);
    console.log(storeInfo.store_state);
    console.log(sellerInfo.seller_contact);

    if (name in sellerInfo) {
      setSellerInfo((prev) => ({ ...prev, [name]: value }));
    } else if (name in storeInfo) {
      setStoreInfo((prev) => ({ ...prev, [name]: value }));
    } else if (name in bankInfo) {
      setbankInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "profile_pic") {
      setSellerInfo((prev) => ({
        ...prev,
        profile_pic: file,
      }));
    }

    // Handle aadhaar_urls[0], aadhaar_urls[1], etc.
    const aadhaarMatch = name.match(/aadhaar_urls\[(\d+)\]/);
    if (aadhaarMatch) {
      const index = parseInt(aadhaarMatch[1], 10);
      setSellerInfo((prev) => {
        const newAadhaar = [...prev.aadhaar_urls];
        newAadhaar[index] = file;
        return {
          ...prev,
          aadhaar_urls: newAadhaar,
        };
      });
    }

    if (name === "address_document") {
      setStoreInfo((prev) => ({
        ...prev,
        address_document: file,
      }));
    }

    if (name === "bank_document") {
      setbankInfo((prev) => ({
        ...prev,
        bank_document: file,
      }));
    }
  };

  const handleClearForm = () => {
    setSellerInfo({
      seller_name: "",
      seller_email: "",
      seller_contact: "",
      seller_address: "",
      seller_city: "",
      seller_district: "",
      seller_state: "",
      seller_postal_code: "",
      profile_pic: "",
      aadhaar_no: "",
      aadhaar_urls: [],
    });

    setStoreInfo({
      store_name: "",
      sagment: "",
      business_pan_number: "",
      gst_type: "",
      gst_number: "",
      address_line_1: "",
      store_landmark: "",
      store_city: "",
      store_state: "",
      store_postal_code: "",
      store_address_url: "",
      store_latitude: "",
      store_longitude: "",
      address_document: "",
    });

    setbankInfo({
      bank_name: "",
      account_number: "",
      confirm_ac_no: "",
      bank_ifsc_code: "",
      bank_account_name: "",
      bank_document: "",
    });
  };

  useEffect(() => {
    setSellerInfo((prev) => ({ ...prev, seller_contact: phone }));
    const { store_latitude, store_longitude } = storeInfo;

    if (store_latitude && store_longitude) {
      const newUrl = `https://www.google.com/maps/@${store_latitude},${store_longitude},21z?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D`;
      setStoreInfo((prev) => ({
        ...prev,
        store_address_url: newUrl,
      }));
    }
  }, [phone, storeInfo.store_latitude, storeInfo.store_longitude]);

  const handleSubmit = () => {
    if (bankInfo.account_number !== bankInfo.confirm_ac_no) {
      alert("Account Number is not same");
    }

    console.log(sellerInfo.seller_contact);

    const errors = validation();
    if (Object.keys(errors).length > 0) {
      console.log("Validation failed:", errors);
      setErrors(errors); // ✅ store them
      return;
    }
    setErrors({});
    dispatch(sellerRegister({ sellerInfo, storeInfo, bankInfo }));
    handleClearForm();
  };
  return (
    <div className="">
      <div className=" p-5 text-4xl font-semibold bg-white sticky top-0 z-10 border-b border-gray-300  ">
        <h1>Add Seller</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-5 p-5  bg-gray-100 overflow-y-auto"
      >
        <div className="p-5 flex bg-white gap-3 items-center ">
          <div className="flex flex-col  items-start">
            <label className="font-semibold">Select State</label>
            <select
              className="p-2 rounded-full bg-gray-200 "
              name="store_state"
              value={storeInfo.store_state}
              onChange={handleChange}
            >
              <option value="">Select </option>
              {Object.keys(stateDistricts).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {storeInfo.store_state && (
            <div className="flex items-end gap-3">
              <div className="flex flex-col items-start">
                <label className="font-semibold">Phone Number (for OTP)</label>
                <div className="flex ">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10 digit Phone Number"
                    className="rounded-full pl-3 py-2 bg-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-blue-600 text-white px-4 py-1 rounded-full ml-2"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              {errors.seller_contact && (
                <p className="text-red-500">{errors.seller_contact}</p>
              )}

              {otpSent && (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={otp}
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="rounded-full pl-3 py-2 bg-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-green-600 text-white px-4 py-1 rounded-full ml-2"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {otpVerified && (
          <div>
            <div className="flex flex-col gap-5 p-10 rounded-lg bg-white ">
              <h3 className="text-3xl font-semibold">Seller Information</h3>
              <div className="grid grid-cols-3 px-10 gap-5">
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Seller Name*</label>
                  <input
                    type="text"
                    name="seller_name"
                    value={sellerInfo.seller_name}
                    onChange={handleChange}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.seller_name && (
                    <p className="text-red-500 text-sm">{errors.seller_name}</p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Email</label>
                  <input
                    name="seller_email"
                    value={sellerInfo.seller_email}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.seller_email && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.seller_email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Contact </label>
                  <div className="flex items-center  max-w-[20vw] ">
                    <span className=" px-3 py-2 bg-gray-200 rounded-l-full border-r border-gray-400">
                      +91
                    </span>
                    <input
                      name="seller_contact"
                      type="number"
                      value={sellerInfo.seller_contact}
                      disabled
                      className=" rounded-r-full pl-3 py-2 bg-gray-200"
                    />
                  </div>
                  {errors.seller_contact && (
                    <p className="text-red-500 text-sm">
                      {errors.seller_contact}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Address </label>
                  <input
                    name="seller_address"
                    value={sellerInfo.seller_address}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.seller_address && (
                    <p className="text-red-500 text-sm">
                      {errors.seller_address}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">City </label>
                  <input
                    name="seller_city"
                    value={sellerInfo.seller_city}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.seller_city && (
                    <p className="text-red-500 text-sm">{errors.seller_city}</p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">District </label>
                  <select
                    name="seller_district"
                    value={sellerInfo.seller_district}
                    onChange={handleChange}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  >
                    <option value="">Select District</option>
                    {stateDistricts[sellerInfo.seller_state]?.map(
                      (district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      )
                    )}
                  </select>

                  {errors.seller_district && (
                    <p className="text-red-500 text-sm">
                      {errors.seller_district}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">State </label>
                  <select
                    className="p-2 rounded-full bg-gray-200 "
                    name="seller_state"
                    value={sellerInfo.seller_state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {Object.keys(stateDistricts).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.seller_state && (
                    <p className="text-red-500 text-sm">
                      {errors.seller_state}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Postal Code </label>
                  <input
                    name="seller_postal_code"
                    value={sellerInfo.seller_postal_code}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter 6 Digit Postal Code"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.seller_postal_code && (
                    <p className="text-red-500 text-sm">
                      {errors.seller_postal_code}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Photo</label>
                  <input
                    type="file"
                    name="profile_pic"
                    onChange={handleFileChange}
                    className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.profile_pic && (
                    <p className="text-red-500 text-sm">{errors.profile_pic}</p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Aadhaar Number </label>
                  <input
                    name="aadhaar_no"
                    value={sellerInfo.aadhaar_no}
                    onChange={handleChange}
                    type="test"
                    placeholder="Enter 12 Digit Postal Code"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.aadhaar_no && (
                    <p className="text-red-500 text-sm">{errors.aadhaar_no}</p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Aadhaar Front</label>
                  <input
                    type="file"
                    name="aadhaar_urls[0]"
                    onChange={handleFileChange}
                    className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.aadhaar_urls?.[0] && (
                    <p className="text-red-500 text-sm">
                      {errors.aadhaar_urls[0]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Aadhaar Back</label>
                  <input
                    type="file"
                    name="aadhaar_urls[1]"
                    onChange={handleFileChange}
                    className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.aadhaar_urls?.[1] && (
                    <p className="text-red-500 text-sm">
                      {errors.aadhaar_urls[1]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-10 rounded-lg bg-white mt-5">
              <h3 className="text-3xl font-semibold">
                Seller Store Information
              </h3>
              <div className="grid grid-cols-3 px-10 gap-5">
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Name</label>
                  <input
                    name="store_name"
                    value={storeInfo.store_name}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_name && (
                    <p className="text-red-500 text-sm ">{errors.store_name}</p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Sagment</label>
                  <select
                    name="sagment"
                    id=""
                    value={storeInfo.sagment}
                    onChange={handleChange}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="mart">Mart</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="salon">Salon</option>
                    <option value="gym">Gym</option>
                  </select>
                  {errors.sagment && (
                    <p className="text-red-500 text-sm">{errors.sagment}</p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">PAN number</label>
                  <input
                    name="business_pan_number"
                    value={storeInfo.business_pan_number}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter 10 Digit valid PAN No"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.business_pan_number && (
                    <p className="text-red-500 text-sm">
                      {errors.business_pan_number}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">GST Type</label>
                  <select
                    name="gst_type"
                    value={storeInfo.gst_type}
                    onChange={handleChange}
                    id=""
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  >
                    <option value="">Select</option>
                    <option value="regular">Regular</option>
                    <option value="composition">Composition</option>
                  </select>
                  {errors.gst_type && (
                    <p className="text-red-500 text-sm">{errors.gst_type}</p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">GST No</label>
                  <input
                    name="gst_number"
                    value={storeInfo.gst_number}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter 15 Digit valid GST No"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.gst_number && (
                    <p className="text-red-500 text-sm">{errors.gst_number}</p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Address </label>
                  <input
                    name="address_line_1"
                    value={storeInfo.address_line_1}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.address_line_1 && (
                    <p className="text-red-500 text-sm">
                      {errors.address_line_1}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Landmark </label>
                  <input
                    name="store_landmark"
                    value={storeInfo.store_landmark}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_landmark && (
                    <p className="text-red-500 text-sm">
                      {errors.store_landmark}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store City </label>
                  <input
                    name="store_city"
                    value={storeInfo.store_city}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_city && (
                    <p className="text-red-500 text-sm">{errors.store_city}</p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store District </label>
                  <select
                    name="store_district"
                    value={storeInfo.store_district}
                    onChange={handleChange}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  >
                    <option value="">Select</option>
                    {stateDistricts[storeInfo.store_state]?.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.store_district && (
                    <p className="text-red-500 text-sm">
                      {errors.store_district}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store State </label>
                  <input
                    name="store_state"
                    value={storeInfo.store_state}
                    type="text"
                    disabled
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_state && (
                    <p className="text-red-500 text-sm ">
                      {errors.store_state}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Postal Code </label>
                  <input
                    name="store_postal_code"
                    value={storeInfo.store_postal_code}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter 6 Digit Postal Code"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_postal_code && (
                    <p className="text-red-500 text-sm">
                      {errors.store_postal_code}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Address URL</label>
                  <input
                    name="store_address_url"
                    value={storeInfo.store_address_url}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_address_url && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.store_address_url}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Latitude</label>
                  <input
                    name="store_latitude"
                    value={storeInfo.store_latitude}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_latitude && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.store_latitude}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Store Longitude</label>
                  <input
                    name="store_longitude"
                    value={storeInfo.store_longitude}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.store_longitude && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.store_longitude}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Address Document</label>
                  <input
                    type="file"
                    name="address_document"
                    onChange={handleFileChange}
                    className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.address_document && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.address_document}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-10 rounded-lg bg-white mt-5">
              <h3 className="text-3xl font-semibold">Bank Information</h3>
              <div className="grid grid-cols-3 px-10 gap-5">
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Bank Name</label>
                  <select
                    name="bank_name"
                    id=""
                    value={bankInfo.bank_name}
                    onChange={handleChange}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200 "
                  >
                    <option value="">Select</option>
                    {bank_name.map((bank, index) => (
                      <option key={index} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>

                  {errors.bank_name && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.bank_name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Account Number</label>
                  <input
                    name="account_number"
                    type="number"
                    onChange={handleChange}
                    value={bankInfo.account_number}
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.account_number && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.account_number}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Confirm Account number</label>
                  <input
                    name="confirm_ac_no"
                    value={bankInfo.confirm_ac_no}
                    onChange={handleChange}
                    type="number"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.confirm_ac_no && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.confirm_ac_no}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Bank IFSC Code</label>
                  <input
                    name="bank_ifsc_code"
                    value={bankInfo.bank_ifsc_code}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter 11 digit valid IFSC Code"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.bank_ifsc_code && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.bank_ifsc_code}
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-semibold">
                  <label htmlFor="">Account Holder Name </label>
                  <input
                    name="bank_account_name"
                    value={bankInfo.bank_account_name}
                    onChange={handleChange}
                    type="text"
                    className=" rounded-full pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.bank_account_name && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.bank_account_name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-semibold">
                  <label htmlFor="">
                    Bank Document{" "}
                    <span className="text-gray-500">
                      (Passbook, Cancelled cheque, Bank statement..)
                    </span>
                  </label>
                  <input
                    type="file"
                    name="bank_document"
                    onChange={handleFileChange}
                    className="file:bg-gray-400 file:rounded file:px-1 file:cursor-pointer rounded-lg pl-3 py-2 max-w-[20vw] bg-gray-200"
                  />
                  {errors.bank_document && (
                    <p className="text-red-500 text-sm capitalize">
                      {errors.bank_document}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full h-20 items-start justify-center gap-5 mt-5">
              <button
                type="submit"
                className=" rounded-full w-72 py-2  bg-green-600 font-semibold text-white cursor-pointer"
              >
                save
              </button>
              <button
                type="button"
                onClick={() => handleClearForm()}
                className="rounded-full  w-72 py-2  bg-red-600 font-semibold text-white cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddSellerForm;
