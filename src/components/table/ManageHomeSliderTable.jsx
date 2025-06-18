import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../../redux/slices/categorySlice";
import AddHomeSlider from "../../pages/homeSlider/AddHomeSlider";
import { useNavigate } from "react-router-dom";

const ManageHomeSliderTable = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [editingData, setEditingData] = useState(false);

  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  // console.log(categories);
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleEdit = (homeSlider) => { 
    setEditingData(homeSlider);
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setEditingData(null);
    navigate("all/slider/manage-home-slider");
    return;
  };

  return (
    <div style={{ width: `calc(100% - 0px)` }}>
      <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0  ">
        <h1>Manage Home Slider Images</h1>
      </div>
      <div className="max-h-[75vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border-t sticky top-0 ">
            <tr>
              <th className="border font-medium p-2">S.No.</th>
              <th className="border font-medium p-2">Icon</th>
              <th className="border font-medium p-2">Category Name</th>
              <th className="border font-medium p-2">Banner</th>
              <th className="border font-medium p-2">Status</th>
              <th className="border font-medium p-2">Add/ Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) &&
              categories
                .filter(
                  (item) => item.banner_urls && item.banner_urls.length !== 0
                )
                .map((item, index) => (
                  <tr key={item.id || index}>
                    <td className="border border-gray-300 text-center font-medium p-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 font-medium text-center p-2">
                      <img
                        src={item.icon}
                        alt="icon"
                        className="h-8 w-8 m-auto"
                      />
                      <div className="text-sm">{item.section}</div>
                    </td>
                    <td className="border border-gray-300 p-2 text-center m-0 font-semibold ">
                      {item.name}
                    </td>

                    <td className="border border-gray-300 font-medium text-center">
                      <div className="relative inset-0 h-10 w-30 m-auto">
                        <img
                          src={item.banner_urls[0]}
                          alt=""
                          className="h-10 w-30 m-auto"
                        />
                        <span className="absolute right-0 bottom-0 p-1 font-semibold bg-black text-white text-xs">
                          {item.banner_urls.length}
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 font-medium text-center p-2">
                      Active
                    </td>

                    <td className="border border-gray-300 p-2 text-center ">
                      <div className="flex text-white gap-2 justify-center items-center">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className=" text-[1.5rem] bg-green-600 text-white px-3 py-1 rounded-md"
                        >
                          <AiOutlineEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <div>
          <AddHomeSlider
            homeSlider={editingData}
            onClose={() => handleFormClose()}
          />
        </div>
      )}
    </div>
  );
};

export default ManageHomeSliderTable;
