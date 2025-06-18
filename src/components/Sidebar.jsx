import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { VscVerifiedFilled } from "react-icons/vsc";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoyIcon from "@mui/icons-material/Boy";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { FaBoxOpen } from "react-icons/fa";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { GrUserWorker } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import profilepic from "../assets/Ellipse 2.png";
import annie_logo from "/annie_logo_png.png"
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails } from "../redux/slices/adminLoginSlice";


const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const { adminProfileData, loading } = useSelector((state) => state.admin);
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
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { icon: <DashboardIcon  />, title: "Dashboard", path: "/all/home" },
    { icon: <FaBoxOpen size={25} />, title: "Products", path: "/all/products" },
    {
      icon: <CurrencyExchangeIcon />,
      title: "Subscription",
      path: "/all/subscription",
    },
    { icon: <FeedbackIcon />, title: "Feedback", path: "/all/feedback" },

    // Seller Section
    {
      title: "Seller",
      icon: <BoyIcon />,
      subRoutes: [
        { title: "Add Seller", path: "/all/seller/add-Seller" },
        { title: "Seller Requests", path: "/all/seller/new-seller-request" },
        { title: "Manage Sellers", path: "/all/seller/manage-sellers" },
        { title: "Seller Privacy", path: "/all/seller/seller-privacy" },
      ],
    },

    // Order Section
    {
      title: "Order",
      icon: <AddShoppingCartIcon />,
      subRoutes: [
        { title: "Orders", path: "/all/order" },
        { title: "Store Order Request", path: "/all/order/store-order-request" },
      ],
    },

    // Home Slider
    {
      title: "Home Slider",
      icon: <PhotoSizeSelectActualIcon />,
      subRoutes: [
        { title: "Add Home Slider", path: "/all/slider/add-home-slider" },
        { title: "Manage Sliders", path: "/all/slider/manage-home-slider" },
      ],
    },

    // Delivery Boy Section
    {
      title: "Delivery Boy",
      icon: <DeliveryDiningIcon />,
      subRoutes: [
        {
          title: "Add Delivery Boy",
          path: "/all/delivery-boy/create-delivery-boy",
        },
        {
          title: "Delivery Boy Requests",
          path: "/all/delivery-boy/delivery-boy-requests",
        },
        {
          title: "Manage Delivery Boys",
          path: "/all/delivery-boy/manage-delivery-boys",
        },
        // {
        //   title: "Delivery Boys Cash",
        //   path: "/all/delivery-boy/delivery-boys-cash",
        // },
        {
          title: "Delivery Boys Policy",
          path: "/all/delivery-boy/delivery-boys-policy",
        },
      ],
    },

    // employee 
    {
      title: "Employee",
      icon: <GrUserWorker />,
      subRoutes: [
        {
          title: "Add Employee",
          path: "/all/employee/create-employee",
        },
        {
          title: "Employee Requests",
          path: "/all/employee/employee-requests",
        },
        {
          title: "Manage Employee",
          path: "/all/employee/manage-employees",
        },
        {
          title: "Employee Policy",
          path: "/all/employee/employees-policy",
        },
      ],
    },

    // Offer Section
    // {
    //   title: "Offers",
    //   icon: <LocalOfferIcon />,
    //   subRoutes: [
    //     { title: "Add Offer", path: "/offer/add-offer" },
    //     { title: "Manage Offer", path: "/offer/manage-offer" },
    //     { title: "Manage Pop-up Offer", path: "/offer/manage-popup-offer" },
    //   ],
    // },

    // Promo Code Section
    // {
    //   title: "Promo Code",
    //   icon: <RedeemIcon />,
    //   subRoutes: [
    //     { title: "Add Promo Code", path: "/promo-code/add-promo-code" },
    //     { title: "Manage Promo Code", path: "/promo-code/manage-promo-code" },
    //   ],
    // },
    // {
    //   title: "Notifications",
    //   icon: <NotificationsIcon />,
    //   subRoutes: [
    //     { title: "Add Notification", path: "/notifications/add-notifications" },
    //     {
    //       title: "Manage Notifications",
    //       path: "/notifications/manage-notifications",
    //     },
    //   ],
    // },
    // { icon: <BuildIcon />, title: "System", path: "/system" },
    // { icon: <FolderCopyIcon />, title: "Reports", path: "/reports" },
    { icon: <SupervisorAccountIcon />, title: "Customer", path: "/all/customer" },
    // { icon: <NaturePeopleIcon />, title: "Role", path: "/role" },
    {
      icon: <ConfirmationNumberIcon />,
      title: "System Users",
      path: "/all/system-user",
    },
    {
      title: "Logout",
      icon: <TbLogout size={30} />,
      path: "/",
    },
  ];

  if (loading === true) {
    <p>Loading..</p>
  }

  return (
    <div className="flex fixed top-0 left-0 h-screen w-[300px] bg-[#ad011d] text-white">
      <div className="w-full overflow-x-hidden overflow-auto">
        {/* User Profile */}
        <div className="flex flex-col items-center py-6">
        <img className="w-44 h-10 m-auto object-cover text-2xl font-bold text-center mb-5" src={annie_logo}/>
          
            <div className="flex flex-col items-center justify-center mt-6 text-white">
              <img
                src={adminProfileData?.profile_url }
                alt="User Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              <h6 className="font-bold text-lg mt-2">{adminProfileData?.name}</h6>
              <h6 className="font-semibold text-gray-300 text-sm">
                +91 {adminProfileData?.phone_number}
              </h6>
              <div className="flex items-center gap-1 mt-1">
                <p className="text-lg font-bold">{adminProfileData?.type}</p>
                <VscVerifiedFilled className="text-xl text-blue-600" />
              </div>
            </div>
         
        </div>
        {/* Sidebar Menu */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subRoutes ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-6 py-3 cursor-pointer`}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon} <span>{item.title}</span>
                    </div>
                    {openMenus[item.title] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </button>

                  {openMenus[item.title] && (
                    <ul className="ml-8 space-y-2">
                      {item.subRoutes.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm rounded transition-transform duration-500 hover:translate-x-2 ${
                              location.pathname === subItem.path
                                ? "bg-gray-300 text-black"
                                : "text-white"
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : item.title === "Logout" ? (
      <div
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="px-6 py-3 items-center gap-3 cursor-pointer flex"
      >
        {item.icon} <span>{item.title}</span>
      </div>
    ) : (
      <Link
        to={item.path}
        className={`px-6 py-3 items-center gap-3 cursor-pointer flex ${
          location.pathname === item.path
            ? "bg-red-300 text-black"
            : "bg-[#ad011d] text-white"
        }`}
      >
        {item.icon} <span>{item.title}</span>
      </Link>
    )}
  </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
