import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, updateWorkout } from "../../redux/slices/workoutSlice";
import { deleteImageAtIndex } from "../../redux/api/workoutApi";

const AddWorkout = ({workout, onClose }) => {
  const { selectedSection } = useSelector((state) => state.workout);
  const dispatch = useDispatch();

  console.log(selectedSection);

  const [formData, setFormData] = useState({
    id: workout?.id, 
    name: workout?.name || "",
    muscles_target:workout?. muscles_targeted || "",
    difficulty_level: workout?.difficulty_level || "",
    duration: workout?.duration || "",
    repetition:workout?.repetition || "",
    description: workout?.description || "",
    benefitInput: "",
    benefits:workout?.benefits || [],
    preview_files: workout?.image_urls || [],
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

    if (name === "description") {
      updatedValue = toSentenceCase(value);
    }

    if (name === "muscles_target") {
      updatedValue = toTitleCase(value);
    }

    if (name === "benefitInput") {
      updatedValue = toTitleCase(value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try {
      if (workout) {
        await dispatch(updateWorkout({ section: selectedSection, formData }))
      } else {
        await dispatch(addWorkout({ section: selectedSection, formData }));  
      }
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const addFeature = () => {
    const trimmed = formData.benefitInput.trim();
    if (trimmed !== "") {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, toSentenceCase(trimmed)],
        benefitInput: "",
      }));
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

    const handleDeleteImage = async (index) => {
      const success = await deleteImageAtIndex(formData.id, index);
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
          Add New Workout
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-9 ">
        <div className="flex gap-10 justify-between">
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

            <div className="flex justify-between">
              <div>
                <label className="block font-medium">Muscles Target</label>
                <input
                  name="muscles_target"
                  type="text"
                  value={formData.muscles_target}
                  onChange={handleChange}
                  className="w-30 border rounded-full px-3 py-1"
                  placeholder="e.g. Leg"
                />
              </div>

              <div>
                <label className="block font-medium">Difficulty Level</label>
                <select
                  name="difficulty_level"
                  value={formData.difficulty_level}
                  onChange={handleChange}
                  className="w-30 border rounded-full px-3 py-1"
                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-70 border rounded-lg px-3 py-2"
                placeholder="Enter description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="capitalize block font-medium">Benefits</label>
              <div className="flex gap-2">
                <input
                type="text"
                  value={formData.benefitInput}
                  name="benefitInput"
                  onChange={(e) =>
                    setFormData({ ...formData, benefitInput: e.target.value })
                  }
                  className="pl-2 p-1 border rounded-lg w-54"
                  placeholder="Enter benefit..."
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg active:bg-blue-600"
                >
                  Add
                </button>
              </div>

              {formData.benefits.length > 0 && (
                <ol
                  type="1"
                  className="mt-2 border max-h-25 px-5 overflow-auto"
                >
                  {formData.benefits.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-1 rounded-lg mt-1 max-w-72"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
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
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div>
                <label className="block font-medium">
                  Duration <span className="text-xs">(min)</span>
                </label>
                <input
                  name="duration"
                  type="text"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-30 border rounded-full px-3 py-1"
                  placeholder="e.g. 15"
                />
              </div>

              <div>
                <label className="block font-medium">Repetition</label>
                <input
                  name="repetition"
                  value={formData.repetition}
                  onChange={handleChange}
                  className="w-30 border rounded-full px-3 py-1"
                  placeholder="eg. 3x10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="h-32 w-32 border flex items-center justify-center relative rounded"
                >
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
            <button
              className="flex m-auto items-center gap-1 justify-center border cursor-pointer w-30 h-9 px-3 py-2 rounded-full"
              // onClick={handleClearAllImages}
              type="button"
            >
              <MdDeleteForever className="text-xl" />
              <p>Clear All</p>
            </button>
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

export default AddWorkout;
