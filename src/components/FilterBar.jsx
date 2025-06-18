import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectList } from "../redux/slices/productSlice";

function FilterBar() {
  const navigate = useNavigate();
  const dipatch = useDispatch()
  const [showCategory, setShowCategory] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const selectedSection = useSelector(
    (state) => state.category.selectedSection
  );
  console.log("filter bar", selectedSection);

  let categoryTimeout, availableTimeout;

  let list = [];

  switch (selectedSection) {
    case "mart":
      list = ["products"];
      break;
    case "restaurant":
      list = ["products"];
      break;
    case "gym":
      list = ["nutrition", "services", "workout", "products"];
      break;
    case "salon":
      list = ["services"];
      break;
  }

  return (
    <div
      className="fixed top-72 justify-between p-2 flex items-center px-5 bg-[#ad011d] z-[9]"
      style={{ width: `calc(100% - 300px)` }}
    >
      <div className="relative cursor-pointer z-[100] flex gap-10">
        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(categoryTimeout);
            setShowCategory(true);
          }}
          onMouseLeave={() => {
            categoryTimeout = setTimeout(() => setShowCategory(false), 300);
          }}
        >
          <p className="font-bold text-white flex items-center">
            Category <KeyboardArrowDownIcon />
          </p>
          {showCategory && (
            <div className="absolute top-5 -left-4 mt-2 bg-white shadow border border-gray-300 rounded-md z-[100]  transition-opacity duration-300">
              <ul className="flex flex-col gap-2  font-semibold w-28">
                <li className="p-2 border-gray-300 hover:bg-gray-200 rounded-t-md">
                  Category
                </li>
                {list.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 border-gray-300 hover:bg-gray-200"
                    onClick={() => {dipatch(setSelectList(item)); navigate(`/all/${selectedSection}/${item}`)}}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </li>
                ))}
                <li
                  className="p-2 hover:bg-gray-200 rounded-b-md"
                  onClick={() => navigate("/all/stock")}
                >
                  Stock
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(availableTimeout);
            setShowAvailable(true);
          }}
          onMouseLeave={() => {
            availableTimeout = setTimeout(() => setShowAvailable(false), 300);
          }}
        >
          <p className="cursor-pointer font-bold text-white flex items-center">
            Available <KeyboardArrowDownIcon />
          </p>
          {showAvailable && (
            <div className="absolute top-5 -left-3 mt-2 bg-white shadow border rounded-md z-[100] border-gray-400 transition-opacity duration-300">
              <ul className="flex flex-col gap-2 font-semibold w-28">
                <li className="p-2 border-gray-300 hover:bg-gray-200 rounded-t-md">
                  Available
                </li>
                <li className="p-2 border-gray-300 hover:bg-gray-200 rounded-b-md">
                  Unavailable
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
