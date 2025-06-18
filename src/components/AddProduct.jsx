import AddIcon from "@mui/icons-material/Add";
import { FaBoxOpen } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { useState } from "react";
import { FaNutritionix } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import AddProductForm from "./form/AddProductForm";
import AddCategoryForm from "./form/AddCategoryForm";
import { useSelector } from "react-redux";
import AddNutrition from "./form/AddNutrition";
import AddWorkout from "./form/AddWorkout";
import AddGymProductForm from "./form/AddGymProductForm";

const AddProduct = () => {
  const selectedSection = useSelector(
    (state) => state.category.selectedSection
  );

  console.log(selectedSection);

  const [showAdd, setShowAdd] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddNutrition, setShowAddNutrition] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddWorkout, setShowAddWorkout] = useState(false)
  const [showAddGymProduct, setShowAddGymProduct] = useState(false)


  return (
    <div className="fixed bottom-8 right-8 gap-5 flex flex-col z-[60]">
      {/* Main Add Button */}
      <button
        onClick={() => setShowAdd(!showAdd)}
        className="h-16 w-16 border border-gray-400 rounded-full text-white transition-all bg-[#ad011d] duration-200 relative"
      >
        <AddIcon sx={{ fontSize: "3rem", fontWeight: "10" }} />
      </button>

      {/* Floating Buttons */}
      {showAdd && (
        <div className="fixed bottom-28 flex flex-col gap-5">
          {/* Banner Button */}
          {/* <button className="h-16 w-16 border border-gray-400 rounded-full text-black transition-all bg-white duration-200 relative ">
            <img src={BannerSvg} className="m-auto" />
          </button> */}

          {/* Add Category Button */}
          <div className="relative group">
            <button
              className="h-16 w-16 border border-gray-400 rounded-full text-black text-4xl text-center transition-all bg-white duration-200"
              onClick={() => setShowAddCategory(true)}
            >
              <MdCategory className="m-auto" />
            </button>
            <span className="absolute top-5 right-5 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
              Add Category
            </span>
          </div>

          {/* Add Product Button */}
          <div className="relative group">
            <button
              className="h-16 w-16 border border-gray-400 rounded-full text-black text-4xl text-center transition-all bg-white duration-200"
              onClick={() => setShowAddProduct(true)}
            >
              <FaBoxOpen
                className="m-auto"
                sx={{ fontSize: "3rem", fontWeight: "10" }}
              />
            </button>
            <span className="absolute top-5 right-5 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
              {selectedSection === "gym" ? "Add service": "Add Products"}
            </span>
          </div>

          {selectedSection === "gym" && (
            <>
              <div className="relative group">
                <button
                  className="h-16 w-16 border border-gray-400 rounded-full text-black text-4xl text-center transition-all bg-white duration-200"
                  onClick={() => setShowAddGymProduct(true)}
                >
                  <MdMiscellaneousServices
                    className="m-auto"
                    sx={{ fontSize: "3rem", fontWeight: "10" }}
                  />
                </button>
                <span className="absolute top-5 right-5 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Add Product
                </span>
              </div>
              <div className="relative group">
                <button
                  className="h-16 w-16 border border-gray-400 rounded-full text-black text-4xl text-center transition-all bg-white duration-200"
                  onClick={() => setShowAddWorkout(true)}
                >
                  <CgGym
                    className="m-auto"
                    sx={{ fontSize: "3rem", fontWeight: "10" }}
                  />
                </button>
                <span className="absolute top-5 right-5 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Add Workout
                </span>
              </div>
              <div className="relative group">
                <button
                  className="h-16 w-16 border border-gray-400 rounded-full text-black text-4xl text-center transition-all bg-white duration-200"
                  onClick={() => setShowAddNutrition(true)}
                >
                  <FaNutritionix
                    className="m-auto"
                    sx={{ fontSize: "3rem", fontWeight: "10" }}
                  />
                </button>
                <span className="absolute top-5 right-5 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Add Nutrition
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Add Product Form Popup */}
      {showAddProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddProduct(false)}
          ></div>
          <div className="absolute z-1000">
            <AddProductForm onClose={() => setShowAddProduct(false)} />
          </div>
        </>
      )}

      {/* Add Category Form Popup */}
      {showAddCategory && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddCategory(false)}
          ></div>
          <div className="absolute z-1000">
            <AddCategoryForm onClose={() => setShowAddCategory(false)} />
          </div>
        </>
      )}
{/* Add Nutrition */}
      {showAddNutrition && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddNutrition(false)}
          ></div>
          <div className="absolute z-1000">
            <AddNutrition onClose={() => setShowAddNutrition(false)} />
          </div>
        </>
      )}

      {/* add workout */}
      {showAddWorkout && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddWorkout(false)}
          ></div>
          <div className="absolute z-1000">
            <AddWorkout onClose={() => setShowAddWorkout(false)} />
          </div>
        </>
      )}
  
  {/* add gym Product */}
   {showAddGymProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddGymProduct(false)}
          ></div>
          <div className="absolute z-1000">
            <AddGymProductForm onClose={() => setShowAddGymProduct(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default AddProduct;
