import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers, updateUser } from "../../../redux/slices/usersSlice";
import { toast } from "react-toastify";
import { IoIosCamera } from "react-icons/io";

const UpdateUserForm = ({ user, onClose }) => {
  console.log(user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [updateData, setUpdateData] = useState({
    email: user.email,
    profile_pic_url: user.profile_pic_url || null,
    preview_profile_pic_url: user.profile_pic_url || null,
    address_line: user.address_line,
    city: user.city,
    state: user.state,
    postal_code: user.postal_code,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.warn("Please uplaod a valid file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.warn("File size must be less than 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUpdateData((prev) => ({
      ...prev,
      profile_pic_url: file,
      preview_profile_pic_url: previewUrl,
    }));
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) {
      toast.warn("Please upload valid file");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setUpdateData((prev) => ({
      ...prev,
      profile_pic_url: file,
      preview_profile_pic_url: previewUrl,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting:", updateData);
    console.log("user id:", user.user_id);
    await dispatch(updateUser({ id: user.user_id, data: updateData }));
    dispatch(getUsers());
    onClose();
  };
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl lg:w-[40vw] max-w-[1200px]">
      <div className="border-b border-gray-700 py-5 flex justify-between p-5">
        <h3 className="font-bold text-3xl">Update User</h3>
        <button
          onClick={onClose}
          className="bg-red-500 p-2 rounded-lg w-20 text-white cursor-pointer"
        >
          Close
        </button>
      </div>
      <form className="overflow-y-auto max-h-[70vh] p-6 flex flex-col gap-10 ">
        <div className="flex">
          <div className="w-full lg:w-2/3  text-left flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Name</label>
              <input
                name="name"
                value={user.name}
                type="text"
                disabled
                className="p-1.5 bg-gray-200  max-w-80 border rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Contact</label>
              <input
                name="name"
                type="text"
                value={user.phone_number.slice(-10)}
                disabled
                className="p-1.5 bg-gray-200 max-w-80 border rounded-full"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Email</label>
              <input
                name="email"
                type="text"
                value={updateData.email}
                onChange={handleChange}
                className="p-1.5 max-w-80 border rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Address Line</label>
              <textarea
                name="address_line"
                type="text"
                value={updateData.address_line}
                onChange={handleChange}
                className="p-1.5 max-w-80 border rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">City</label>
              <input
                name="city"
                type="text"
                value={updateData.city}
                onChange={handleChange}
                className="p-1.5 max-w-80 border rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col  items-center gap-2">
            <div>
              <span className="font-bold">Profile Pic</span>
              <div
                className="h-48 w-48 relative border-2 border-dashed border-gray-400 hover:border-red-500 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {updateData.preview_profile_pic_url ? (
                  <>
                    <img
                      src={updateData.preview_profile_pic_url}
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
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">State</label>
              <input
                name="state"
                type="text"
                value={updateData.state}
                onChange={handleChange}
                className="p-1.5 max-w-80 border rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Postal Code</label>
              <input
                name="postal_code"
                type="text"
                value={updateData.postal_code}
                onChange={handleChange}
                className="p-1.5 max-w-80 border rounded-full"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex m-auto bg-green-600 py-2 px-4 rounded-lg font-semibold text-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
