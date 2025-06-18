import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { RegisterWithOtp, VerifyOtp } from "../redux/slices/authSlice";
import { loginAdmin } from "../redux/slices/adminLoginSlice";

const LoginPage = () => {
  const { otpSent, otpVerified } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins } = useSelector((state) => state.admin);

  console.log(admins);
  

  // useEffect(() => {
  //   const storedAdmin = localStorage.getItem("admin");
  //   if (storedAdmin) {
  //     const admin = JSON.parse(storedAdmin);
  //     if (admin?.type === "Super Admin") {
  //       navigate(`/all/home`);
  //     }
  //   }
  // }, [navigate]);

  const handleSendOtp = async () => {
    const phone_no = phone.slice(-10);

    if (phone.length !== 10) {
      alert("Phone Number should be 10 digits");
      return;
    } else {
      await dispatch(RegisterWithOtp(phone_no));
      console.log("Admin Login continue");
    }
  };

 const handleVerifyOtp = async () => {
  try {
    const result = await dispatch(VerifyOtp({ phoneNumber: phone, token: otp }));

    if (VerifyOtp.rejected.match(result)) {
      alert(`OTP verification failed: ${result.payload}`);
      return;
    }

    // ✅ OTP verified, now login
    const loginResult = await dispatch(loginAdmin(phone));

    if (loginResult.meta.requestStatus === "fulfilled") {
      const admin = loginResult.payload[0]; // assuming it's an array
      if (admin?.type && admin?.type === "Super Admin") {
        localStorage.setItem("admin", JSON.stringify(admin));
        toast.success("Login successfully!");
        
        navigate(`/all/home`);
      } else {
        alert("Unauthorized admin or missing type");
      }
    } else {
      alert("Admin login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};


  return (
    <div className="bg-gradient-to-br from-red-600 via-black/90 to-red-600 h-screen w-screen  flex items-center justify-center">
      <div className=" h-[55vh] w-[65vh] bg-black text-white rounded-2xl pt-7 pl-5 ">
        <h1 className="text-2xl font-bold ml-25 mt-5">Login to Your Account</h1>
        <form className="flex flex-col px-20  py-10 gap-5 ">
          {!otpSent ? (
            <>
              <h1 className="text-xl mt-5 font-semibold">
                Sign up with Phone No.
              </h1>
              <input
                type="number"
                required
                value={phone}
                className=" no-arrows mt-5 border-b border-white  h-10 w-80 p-2"
                placeholder="Enter Phone No."
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className=" text-xl font-bold bg-red-600 h-10 w-80 rounded-full text-white mt-10 hover:bg-red-800 "
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl mt-5 font-semibold">OTP Verification</h1>
              <input
                type="text"
                value={otp}
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                className="no-arrows mt-5 border-b border-white  h-10 w-80 p-2"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className=" text-xl font-bold bg-red-600 h-10 w-80 rounded-full text-white mt-10 hover:bg-red-800"
              >
                Verify OTP
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
