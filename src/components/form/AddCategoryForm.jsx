import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addCategory, updateCategory } from "../../redux/slices/categorySlice";


const AddCategoryForm = ({ onClose, existingCategory }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { selectedSection } = useSelector((state) => state.category);
  console.table(existingCategory);
  // Pre-fill form if editing
  const [categoryData, setCategoryData] = useState({
    id: existingCategory?.id || uuidv4(), // Use existing ID or generate a new one
    name: existingCategory?.name || "",
    icon: existingCategory?.icon || null,
    iconPreview: existingCategory?.icon || null, // Show existing icon if available
    section: existingCategory?.section || selectedSection,
  });

  useEffect(() => {
    if (selectedSection && !existingCategory) {
      setCategoryData((prev) => ({
        ...prev,
        section: selectedSection,
      }));
    }
  }, [selectedSection, existingCategory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCategoryData((prev) => ({
      ...prev,
      icon: file,
      iconPreview: previewUrl,
    }));
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCategoryData((prev) => ({
      ...prev,
      icon: file,
      iconPreview: previewUrl,
    }));
  };

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Save (Create or Update)
  const handleSubmit = async () => {
    if (!categoryData.name || !categoryData.section) {
      alert("Please provide a category name and section.");
      return;
    }

    try {
      if (existingCategory) {
        // Update category
        dispatch(updateCategory(categoryData));
      } else {
        // Add new category
        dispatch(addCategory(categoryData));
      }
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-auto max-h-[86vh] bg-white shadow min-w-[30vw] rounded-xl">
      <div className="h-10 bg-red-500 p-2 text-2xl flex justify-between rounded-t-xl text-white">
        <button onClick={onClose} className="cursor-pointer">
          <MdCancel />
        </button>
        <p className="text-sm">
          {existingCategory ? "Edit Category" : "Add a New Category"}
        </p>
        <button onClick={handleSubmit} className="cursor-pointer">
          <FaCheck />
        </button>
      </div>

      <form className="p-9 gap-10">
        <div className="flex flex-col w-full items-center">
          <label className="font-semibold">Category Icon</label>
          <div
            className="border-2 h-50 w-50 border-dashed bg-white border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {categoryData.iconPreview ? (
              <img
                src={categoryData.iconPreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500 text-center">
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

        <div className="mt-4 flex flex-col items-center">
          <label className="font-semibold">Category Name</label>
          <input
            name="name"
            type="text"
            value={categoryData.name}
            onChange={handleChange}
            className="p-2 bg-white max-w-72 border rounded-full w-full"
            placeholder="Enter category name"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
