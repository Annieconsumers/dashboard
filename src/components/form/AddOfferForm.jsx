
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";


const AddOfferForm = () => {
  
  const [image, setImage] = useState(null);
      const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed top-24 right-96 max-h-[70vh] bg-white shadow min-w-[40vw]  rounded-xl ">
      <form className="p-10 gap-5 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Type
            </label>
            <select value="" className="p-2 border rounded-full">
              <option name="" id="">
                Default
              </option>
              <option name="" id="">
                Category
              </option>
              <option name="" id="">
                Product
              </option>
            </select>
          </div>
          <div className="flex flex-col  gap-2">
            <label htmlFor="" className="font-semibold">
              Image
            </label>
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()} 
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
              ) : (
                <p className="text-gray-500">Drag & Drop or Click to Upload</p>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef} // Reference input
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Position
            </label>
            <select value="" className="p-2 border rounded-full">
              <option name="" id="">
                Default
              </option>
              <option name="" id="">
                Category
              </option>
              <option name="" id="">
                Product
              </option>
            </select>
          </div>
        </div>
        <div className="text-2xl flex justify-between mt-5">
          <button className="flex items-center justify-center p-1 gap-2 bg-green-500 w-30 rounded-full cursor-pointer font-semibold text-white">
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("all/offer/manage-offer")}
            className="flex items-center justify-center p-1 gap-2 bg-red-500 w-30 rounded-full cursor-pointer font-semibold text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
