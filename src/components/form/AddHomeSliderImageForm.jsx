import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { addHomeSlider } from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteImageFromStorage, removeBannerSlider } from "../../redux/api/categoryApi";

const AddHomeSliderImageForm = ({homeSlider, onClose}) => {

 const [errors, setErrors] = useState({});
 
   const validateFields = () => {
     let newError = {};
     if (!selectedSection) newError.selectedSection = "Select section";
     if (!selectedCategoryId) newError.selectedCategoryId = "Select category";
     if (!currentDescription) newError.currentDescription = "Enter description";
     if (!currentBannerImage) newError.currentBannerImage = "Upload an image";
     setErrors(newError);
     return Object.keys(newError).length === 0;
   };
 

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  // console.log(categories);
  // console.log("home slider data", homeSlider);
  // console.log("on Close data", onClose);

  const [selectedSection, setSelectedSection] = useState( homeSlider?.section || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState(homeSlider?.id || "" );

  // for storing banner data in an array
  const [descriptions, setDescription] = useState(homeSlider?.descriptions || []);
  const [bannerImages, setBannerImages] = useState(homeSlider?.banner_urls|| []);

  // for storing single value of banner data
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentBannerImage, setCurrentBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentBannerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCurrentBannerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const filteredCategory = Array.isArray(categories)
    ? categories.filter((item) => item?.section === selectedSection)
    : [];

  const addBanner = () => {

      if (!validateFields()) {
          toast.warning("Please fill all required fields");
          return;
        }
    setDescription((prev) => [...prev, currentDescription]);
    setBannerImages((prev) => [...prev, currentBannerImage]);

    //clear inputs
    setCurrentBannerImage(null);
    setCurrentDescription(""); 
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeBanner = async(index) => {
    setDescription((prev) => prev.filter((_, i) => i !== index));
    setBannerImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("description data", descriptions );
    console.log("Banner Image data", bannerImages);
    console.log("Selected Category id", selectedCategoryId);
    const data = {
      descriptions,
      bannerImages,
    };

    if (homeSlider?.id) {
      await dispatch(
        addHomeSlider({
          bannerData: data,
          categoryId: selectedCategoryId,
          section: selectedSection,
        })
      );
      // toast.success("Banner Updated Successfully")
    } else {
      await dispatch(
        addHomeSlider({
          bannerData: data,
          categoryId: selectedCategoryId,
          section: selectedSection,
        })
      );
      // toast.success("Banner Added Successfully")
    }
    navigate("/all/slider/manage-home-slider")
  };

  const handleDelete = async (index) => {
    const imageUrlToRemove = bannerImages[index]
    const descriptionToRemove = descriptions[index]
    setDescription((prev) => prev.filter((_, i) => i !== index));
    setBannerImages((prev) => prev.filter((_, i) => i !== index));

    await removeBannerSlider(homeSlider.id, imageUrlToRemove, descriptionToRemove)

    await deleteImageFromStorage(imageUrlToRemove)
  };

  return (
    <div className="fixed top-18 right-[32vw] max-h-[80vh] overflow-y-auto bg-white shadow min-w-[30vw] rounded-xl p-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Add Home Slider</h2>
        <form className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="font-semibold">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={descriptions.length > 0}
                className={`px-4 py-2 border rounded-full bg-gray-200 `}
              >
                <option value="">Select</option>
                <option value="mart">Mart</option>
                <option value="restaurant">Restaurant</option>
                <option value="gym">Gym</option>
                <option value="salon">Salon</option>
              </select>
              {errors.selectedSection && <p className="text-red-600">{errors.selectedSection}</p>}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="" className="font-semibold">
                Category
              </label>
              <select
                value={selectedCategoryId || homeSlider?.id}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                disabled={descriptions.length > 0}
                className="px-4 py-2 border rounded-full bg-gray-200"
              >
                <option value="">Select</option>
                {filteredCategory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            {errors.selectedCategoryId && <p className="text-red-600">{errors.selectedCategoryId}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold ">Banner</h4>
            <div
              className="h-60 border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              // onDrag={handleDragOver}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-400 font-semibold text-center">
                  Drag & drop or click to upload
                </p>

              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            {errors.currentBannerImage && <p className="text-red-600">{errors.currentBannerImage}</p>}

            </div>
            <input
              type="text"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              placeholder="Enter Description"
              className="border rounded-full p-2 w-full mt-2"
            />
          {errors.currentDescription && <p className="text-red-600">{errors.currentDescription}</p>}
            <button
              type="button"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              onClick={addBanner}
            >
              Add
            </button>
          </div>
          {(descriptions.length > 0 || bannerImages.length > 0 ) && (
            <div className="flex flex-col gap-1 overflow-y-scroll">
              <h3 className="font-semibold">Added Banners</h3>
              <ul className="flex flex-col gap-3">
                {bannerImages.map((image, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 justify-between border p-1"
                  >
                    <div className="flex gap-3 items-center">
                      <span className="font-semibold">{index + 1}.</span>
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt={`Banner ${index + 1}`}
                        className="w-32 h-15 object-cover rounded border border-gray-300 text-"
                      />
                       {descriptions[index] && <p className="text-sm font-semibold">{descriptions[index]}</p>}
                    </div>
                    <div className="flex gap-1 ">
                    { homeSlider?.id ? (<button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="text-md p-1 rounded-full bg-red-700 cursor-pointer text-white"
                      >
                        <ImBin />
                      </button>)
                      : (<button
                        type="button"
                        onClick={() => removeBanner(index)}
                        className="text-md p-1 rounded-full bg-black font-extrabold cursor-pointer text-white"
                      >
                        <RxCross2 />
                      </button>) 
                      }                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-2">
            
            <button
              type="button"
              className="w-full bg-green-600 text-white px-4 py-2 rounded font-semibold"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose || (()=>navigate("/all/slider/manage-home-slider"))}
              className="w-full bg-red-600 text-white px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomeSliderImageForm;
