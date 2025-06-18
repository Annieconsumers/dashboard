import { useEffect, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addGymProduct,
  updateGymProduct,
} from "../../redux/slices/gymProductSlice";
import { deleteProductImageAtIndex } from "../../redux/api/gymProductApi";

const AddGymProductForm = ({ product, onClose }) => {
  const { selectedSection } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  console.log(selectedSection);

  const [formData, setFormData] = useState({
    id: product?.id,
    name: product?.name || "",
    quantity: product?.stock_quantity || "",
    hsnCode: product?.hsn_code || "",
    gstPercentage: product?.gst || "",
    mrp: product?.price || "",
    discount: product?.discount_percentage || "70",
    currentPrice: product?.discount_price || "",
    brand: product?.brand_name || "",
    description: product?.description || "",
    benefitInput: "",
    benefits: product?.benefits || [],
    files: [],
    preview_files: product?.image_urls || [],
    taxable_value: product?.taxable_price || "",
    cgst_inr: product?.cgst_inr || "",
    sgst_inr: product?.sgst_inr || "",
  });

  // Calculate current price when MRP or discount changes
  useEffect(() => {
    if (formData.mrp && formData.discount) {
      const mrp = parseFloat(formData.mrp);
      const discount = parseFloat(formData.discount);
      if (!isNaN(mrp) && !isNaN(discount)) {
        const discountAmount = (mrp * discount) / 100;
        const currentPrice = Math.round(mrp - discountAmount);
        setFormData((prev) => ({
          ...prev,
          currentPrice: currentPrice.toString(),
        }));
      }
    }
  }, [formData.mrp, formData.discount]);

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

    setFormData((prev) => {
      let newState = { ...prev, [name]: updatedValue };
      let price = name === "price" ? parseFloat(value) : parseFloat(prev.price);
      let discount =
        name === "discount_percentage"
          ? parseFloat(value)
          : parseFloat(prev.discount_percentage);

      if (!isNaN(price) && !isNaN(discount)) {
        const discountedPrice = price - (price * discount) / 100;
        newState.discounted_price = discountedPrice.toFixed(2);
      }

      // Handle GST calculation inline too
      const totalPrice = parseFloat(newState.discounted_price);
      const gstRate = name === "gst" ? parseFloat(value) : parseFloat(prev.gst);

      if (!isNaN(gstRate) && !isNaN(totalPrice)) {
        const taxFraction = gstRate / 100;
        const basePrice = totalPrice / (1 + taxFraction);
        const totalTax = totalPrice - basePrice;
        const cgst = totalTax / 2;
        const sgst = totalTax / 2;

        newState.taxable_value = basePrice.toFixed(2);
        newState.cgst_inr = cgst.toFixed(2);
        newState.sgst_inr = sgst.toFixed(2);
      }

      return newState;
    });
  };

  const handleGstCalculate = (gstValue) => {
    const gstRate = parseFloat(gstValue);
    const totalPrice = parseFloat(formData.currentPrice);

    if (isNaN(gstRate) || isNaN(totalPrice)) {
      return; // avoid alert spamming, silently ignore invalid cases
    }

    const taxFraction = gstRate / 100;
    const basePrice = totalPrice / (1 + taxFraction);
    const totalTax = totalPrice - basePrice;
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;

    setFormData((prev) => ({
      ...prev,
      taxable_value: basePrice.toFixed(2),
      cgst_inr: cgst.toFixed(2),
      sgst_inr: sgst.toFixed(2),
    }));
  };

  const handleAddBenefit = () => {
    const trimmed = formData.benefitInput.trim();
    if (trimmed !== "") {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, trimmed],
        benefitInput: "",
      }));
    }
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  console.log(formData.images);

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      preview_files: prev.preview_files.filter((_, i) => i !== index),
      files: prev.files.filter((_, i) => i !== index),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (product) {
      await dispatch(updateGymProduct({ section: selectedSection, formData }));
    } else {
      await dispatch(addGymProduct({ section: selectedSection, formData }));
    }
    onClose();
    return;
  };

    const handleDeleteImage = async (index) => {
      const success = await deleteProductImageAtIndex(formData.id, index);
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
    <div className="fixed top-1/2 right-1/2 transition translate-x-1/2 -translate-y-1/2 max-w-3xl mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div className="p-2  shadow-lg h-full w-full bg-red-500">
        <h2 className="text-lg font-medium text-center">Add a new Products</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-15 gap-y-4 ">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  HSN Code
                </label>
                <input
                  type="number"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleChange}
                  className="w-full border rounded-md pl-2 no-arrows py-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border no-arrows rounded-md px-3 py-1"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">MRP</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    className="w-full border rounded-md pl-7 pr-3 py-1"
                    placeholder="2800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount
                </label>
                <div className="flex overflow-hidden rounded-md border">
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full px-3 py-1 focus:outline-none"
                  />
                  <span className="bg-red-500 text-white px-2 flex items-center text-sm">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="currentPrice"
                    value={formData.currentPrice}
                    className="w-full border rounded-md pl-7 pr-3 py-1 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GST %</label>
                <select
                  name="gstPercentage"
                  value={formData.gstPercentage}
                  onChange={(e) => {
                    handleChange(e);
                    handleGstCalculate(e.target.value);
                  }}
                  className="w-full border rounded-md px-3 py-1"
                >
                  <option value="">Select</option>
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                </select>
              </div>
            </div>

            {formData.cgst_inr && (
              <div className="mt-2 flex justify-between text-sm">
                <p>
                  <strong>Taxable Value:</strong> ₹{formData.taxable_value}
                </p>
                <p>
                  <strong>CGST:</strong> ₹{formData.cgst_inr}
                </p>
                <p>
                  <strong>SGST:</strong> ₹{formData.sgst_inr}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Benefits</label>
              <div className="flex">
                <input
                  type="text"
                  value={formData.benefitInput}
                  onChange={(e) =>
                    setFormData({ ...formData, benefitInput: e.target.value })
                  }
                  className="w-full border rounded-l-md px-3 py-1"
                  placeholder="Add benefits"
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="bg-blue-500 active:bg-blue-600 text-white px-4 rounded-r-md"
                >
                  Add
                </button>
              </div>
              {formData.benefits.length > 0 && (
                <ol className="list-decimal mt-2 border max-h-15 px-1 overflow-auto">
                  {formData.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 border-b p-1 border-gray-300 flex justify-between"
                    >
                      <p className="flex gap-2">
                        <span>{index + 1}.</span>
                        {benefit}{" "}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="bg-red-500 text-white px-2 py-1 h-8 rounded-lg text-sm hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 ">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Product Images
              </label>
              <div className="grid grid-cols-2 gap-y-8">
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
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white rounded-full py-2 px-8"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-green-600 active:bg-green-700 text-white rounded-full py-2 px-8"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGymProductForm;
