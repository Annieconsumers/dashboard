import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addNutrition,
  updateNutrition,
} from "../../redux/slices/nutritionSlice";
import { deleteNutritionImageAtIndex } from "../../redux/api/nutritionApi";

const AddNutrition = ({ nutrition, onClose }) => {
  const { selectedSection } = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();
  console.log(selectedSection);

  const [formData, setFormData] = useState({
    id: nutrition?.id,
    name: nutrition?.name || "",
    calories: nutrition?.calories || "",
    serving: nutrition?.serving || "",
    protein: nutrition?.protein || "",
    descriptionInput: "",
    description: nutrition?.description || [],
    preview_files: nutrition?.image_urls || [],
    files: [],
  });

  const toSentenceCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = toTitleCase(value);
    }

    if (name === "descriptionInput") {
      updatedValue = toSentenceCase(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return "Please Provide an image";

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => {
      const newImagePrev = [...prev.preview_files];
      const newImage = [...prev.files];

      newImagePrev.push(null);
      newImage.push(null);

      newImagePrev[index] = imageUrl;
      newImage[index] = file;

      return {
        ...prev,
        preview_files: newImagePrev,
        files: newImage,
      };
    });
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      preview_files: prev.preview_files.filter((_, i) => i !== index),
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const addDescription = () => {
    const trimmed = formData.descriptionInput.trim();
    if (trimmed !== "") {
      setFormData((prev) => ({
        ...prev,
        description: [...prev.description, toSentenceCase(trimmed)],
        descriptionInput: "",
      }));
    }
  };

  const removeDescription = (index) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    if (nutrition) {
      await dispatch(updateNutrition({ section: selectedSection, formData }));
    } else {
      await dispatch(addNutrition({ section: selectedSection, formData }));
    }
    onClose();
  };

  const handleDeleteImage = async (index) => {
    const success = await deleteNutritionImageAtIndex(formData.id, index);
    if (success) {
      const updatedPreviews = [...formData.preview_files];
      updatedPreviews.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        preview_files: updatedPreviews,
      }));
    }
  };

  return (
    <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 max-w-2xl w-full bg-white  max-h-screen overflow-hidden rounded-xl z-50">
      <div className="p-2  shadow-lg h-full w-full bg-red-500 ">
        <h2 className="text-xl text-white font-semibold text-center ">
          Add New Nutrition
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-9">
        <div className="flex gap-10">
          <div className="flex flex-col md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-70 border rounded-full px-3 py-1"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block font-medium">Calories</label>
              <input
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
                className="w-70 no-arrows border rounded-full px-3 py-1"
                placeholder="e.g. 250"
              />
            </div>

            <div>
              <label className="block font-medium">Serving</label>
              <input
                name="serving"
                value={formData.serving}
                onChange={handleChange}
                className="w-70 no-arrows border rounded-full px-3 py-1"
                placeholder="e.g. 1 cup"
              />
            </div>

            <div>
              <label className="block font-medium">Protein</label>
              <input
                name="protein"
                type="number"
                value={formData.protein}
                onChange={handleChange}
                className="w-70 border rounded-full px-3 py-1"
                placeholder="e.g. 10g"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block font-medium">Description</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.descriptionInput}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descriptionInput: e.target.value,
                    })
                  }
                  className="pl-2 p-1 border rounded-lg w-54"
                />
                <button
                  type="button"
                  onClick={addDescription}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg active:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {formData.description.length > 0 && (
                <ol
                  type="1"
                  className="list-decimal mt-2 border max-h-25 px-5 overflow-auto"
                >
                  {formData.description.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-1 rounded-lg mt-1 max-w-72"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeDescription(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-32 w-32 border flex items-center justify-center relative rounded"
              >
                {" "}
                {formData.preview_files[index] ? (
                  <div className="relative h-full w-full">
                    <img
                      src={formData.preview_files[index]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {formData.preview_files[index]?.startsWith("blob:") ? (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute z-10 top-0 right-0 bg-black/70 text-white cursor-pointer"
                      >
                        <RxCross2 />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute z-10 top-0 right-0 bg-red-600 text-white cursor-pointer"
                      >
                        <MdDeleteForever />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <IoMdCloudUpload className="text-3xl text-gray-500" />
                    <span className="text-xs text-gray-500">
                      Image {index + 1}
                    </span>
                    <p className="text-xs text-gray-500">Click to upload</p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </label>
                )}
              </div>
            ))}
            {/* {errors.product_image_prev && (
                        <p className="text-red-500 text-[14px]">
                          {errors.product_image_prev}
                        </p>
                      )} */}
            {/* {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>} */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-8 justify-center mt-6">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full px-6 py-2 bg-red-500 text-white font-semibold "
          >
            Close
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-full px-6 py-2 bg-green-600 text-white font-semibold "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNutrition;
