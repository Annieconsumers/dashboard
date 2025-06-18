import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreIcon from "@mui/icons-material/Store";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { BsScissors } from "react-icons/bs";
import { setSelectedSection, getCategories } from "../redux/slices/categorySlice";
import { getProducts } from "../redux/slices/productSlice";

const feature = [
  { icon: <StoreIcon sx={{ fontSize: "7rem" }} />, title: "Mart", section: "mart" },
  { icon: <RestaurantIcon sx={{ fontSize: "7rem" }} />, title: "Food", section: "restaurant" },
  { icon: <FitnessCenterIcon sx={{ fontSize: "7rem" }} />, title: "Gym", section: "gym" },
  { icon: <BsScissors size="7rem" />, title: "Salon", section: "salon" },
];

const Sections = () => {
  const dispatch = useDispatch();
  const selectedSection = useSelector((state) => state.category.selectedSection);
  console.log(selectedSection);
  

  const handleSectionChange = async(section) => {
    await dispatch(setSelectedSection(section));
    dispatch(getCategories(section));
    dispatch(getProducts(section));
  };

  // Set default section on first render
  useEffect(() => {
    if (!selectedSection) {  // ✅ Only set default if not already selected
      handleSectionChange("mart");
    }
  }, [selectedSection, dispatch]);  // ✅ Depend on selectedSection

  return (
    <div className="fixed top-20 justify-between p-5 flex items-center px-18"
      style={{ width: `calc(100% - 300px)` }}>
      {feature.map((section, index) => (
        <button
          key={index}
          onClick={() => handleSectionChange(section.section)}
          className={`flex flex-col w-[200px] h-42  border border-gray-200 rounded-xl items-center hover:bg-[#ad011d] text-[#ad011d] hover:text-white
            ${selectedSection == section.section ? "bg-[#ad011d] text-white":"bg-white"} `}
        >
          <div className='flex flex-row items-center justify-center text-[7.2rem]'>
            {section.icon}
          </div>
          <h4 className='text-4xl font-bold'>{section.title}</h4>
        </button>
      ))}
    </div>
  );
};

export default Sections;
