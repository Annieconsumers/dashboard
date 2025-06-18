import { useEffect, useState } from "react";
import { MdOutlineModeEdit, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../redux/slices/categorySlice";
import AddCategoryForm from "./form/AddCategoryForm";

const CustomTable = () => {
  const dispatch = useDispatch();
  const { categories, loading, selectedSection } = useSelector(
    (state) => state.category
  );
  // console.log(categories);
  
  const [editingCategory, setEditingCategory] = useState(null); // Store selected category

  useEffect(() => {
    dispatch(getCategories(selectedSection));
  }, [dispatch, selectedSection]);

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div style={{ width: `calc(100% - 0px)` }}>
      <div className="max-h-[52vh] overflow-y-auto">
        <table className="w-full product-table border">
          <thead className="bg-gray-200 border-t sticky top-0">
            <tr>
              <th className="border border-gray-300 font-bold p-2">Icon</th>
              <th className="border border-gray-300 font-bold p-2">Name</th>
              <th className="border border-gray-300 font-bold p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) &&
              categories.filter(Boolean).map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 font-medium text-center p-2">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt="icon"
                        className="h-10 w-10 m-auto"
                      />
                    ) : (
                      <span>No Icon</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-semibold">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex gap-1 justify-center text-white items-center">
                      <button onClick={() => setEditingCategory(item)}>
                        <MdOutlineModeEdit className="bg-blue-500 cursor-pointer text-3xl rounded-full p-1" />
                      </button>
                      <button onClick={() => handleDelete(item.id)}>
                        <MdDeleteForever className="bg-red-500 cursor-pointer text-3xl rounded-full p-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Show AddCategoryForm only when editing */}
      {editingCategory && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setShowAddCategory(false)}
          ></div>
          <div className="absolute z-1000">
            <AddCategoryForm
              onClose={() => setEditingCategory(null)}
              existingCategory={editingCategory}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomTable;
