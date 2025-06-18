import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails } from "../redux/slices/adminLoginSlice";
import { useEffect } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";

const Header = () => {
  const { adminProfileData } = useSelector((state) => state.admin);
  const { adminDetails } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      if (parsedAdmin?.id) {
        dispatch(getAdminDetails(parsedAdmin));
      }
    }
  }, [dispatch]);

  console.log(adminProfileData);
  console.log(adminDetails);

  return (
    <div
      style={{ width: `calc(100% - 300px)` }}
      className="fixed top-0 bg-white  border-b border-gray-400 p-5  flex items-center shadow"
    >
      <div className="flex flex-row justify-between items-center gap-5 w-full mx-8 ">
        <h3 className="text-4xl font-bold italic ">Annie Consumers</h3>
        <div className="flex items-center flex-row  gap-10">
          <div className="flex gap-2 items-center">
            <img
              src={adminProfileData.profile_url}
              alt="pofile pic"
              className="h-12 w-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <p className="flex text-lg items-end gap-1 font-semibold">
                {adminProfileData.name} <span className="text-blue-500"><VscVerifiedFilled /></span>
              </p>
              <span className="text-sm text-gray-500">
                {adminProfileData.type}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="curser-pointer text-white font-semibold bg-red-500 hover:bg-red-600 active:bg-red-400 px-5 py-2 rounded-full"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
