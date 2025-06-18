import React, { useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { MdOutlinePercent } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slices/categorySlice";
import {
  addProduct,
  deleteProductImage,
  updateProducts,
} from "../../redux/slices/productSlice";
import { toast } from "react-toastify";

const AddProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { categories, loading, selectedSection } = useSelector(
    (state) => state.category
  );
  // console.log("categories", categories);
  console.log("selectedSection", selectedSection);

  useEffect(() => {
    dispatch(getCategories(selectedSection) );
  }, [dispatch, selectedSection]);

  //features according to section

  const getFeatureKey = () => {
    switch (selectedSection) {
      case "mart":
        return "benefits";
      case "restaurant":
        return "ingredients";
      case "gym":
        return "facilities";
      case "salon":
        return "highlights";
      default:
        return "features";
    }
  };

  const featureKey = getFeatureKey();
  // state management

  const [productData, setProductData] = useState({
    id: product?.id,
    name: product?.name || "",
    hsn_code: product?.hsn_code || null,
    price: product?.price || "",
    discount_percentage: product?.discount_percentage || "",
    discounted_price:
      product?.discounted_price ||
      "",
    gst: product?.gst || null,
    sgst_inr: product?.sgst_inr || null,
    cgst_inr: product?.cgst_inr || null,
    taxable_value: product?.taxable_price || null,
    category: product?.categories?.name || "",
    product_image_prev: product?.image_urls || [],
    product_image: [],
    description: product?.description || "",
    [featureKey]: product ? product[featureKey] || [] : [],
    duration: ["salon", "gym"].includes(selectedSection)
      ? product?.duration || ""
      : null,
    stock_quantity: ["mart", "restaurant"].includes(selectedSection)
      ? product?.stock_quantity || ""
      : null,
    category_id: product?.category_id || "",
  });

  const [currentFeature, setCurrentFeature] = useState("");
  const [errors, setErrors] = useState({});

  // derived all validations

  const validateFields = () => {
    let newErrors = {};
    if (!productData.name.trim()) newErrors.name = "Name is required.";
    // if (!productData.hsn_code.trim()) newErrors.hsn_code = "HSN code is required.";
    if (!productData.price || productData.price <= 0)
      newErrors.price = "Price is required.";
    if (
      productData.discount_percentage === "" ||
      productData.discount_percentage < 0
    )
      newErrors.discount_percentage = "Discount percentage is required.";
    if (!productData.category_id) newErrors.category = "Select a category.";
    // if (!productData.gst) newErrors.gst = "Please select GST rate.";
    if (!productData.description.trim())
      newErrors.description = "Description is required.";
    // if (productData.product_image_prev.length !== 4)
    //   newErrors.images = "All images are required.";

    if (["salon", "gym"].includes(selectedSection) && !productData.duration) {
      newErrors.duration = "Duration is required.";
    }

    if (
      ["mart"].includes(selectedSection) &&
      (!productData.stock_quantity || productData.stock_quantity < 0)
    ) {
      newErrors.stock_quantity = "Stock quantity is required.";
    }
    if (productData[featureKey].length < 3) {
      newErrors[featureKey] = `atleast 3 ${featureKey} required.`;
    }
    // if (productData.product_image_prev.length < 4) {
    //   newErrors.product_image_prev = "4 images are required";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toSentenceCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

  // Add a new benefit to the list
  const addFeature = () => {
    if (currentFeature.trim() !== "") {
      setProductData((prev) => ({
        ...prev,
        [featureKey]: [
          ...prev[featureKey],
          toSentenceCase(currentFeature.trim()),
        ],
      }));
      setCurrentFeature("");
    }
  };

  console.log(productData.product_image_prev);

  // Remove a benefit from the list
  const removeFeature = (index) => {
    setProductData((prev) => ({
      ...prev,
      [featureKey]: prev[featureKey].filter((_, i) => i !== index), // Remove from productData.benefits
    }));
  };

  const removeImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      product_image_prev: prev.product_image_prev.filter((_, i) => i !== index),
      product_image: prev.product_image.filter((_, i) => i !== index),
    }));
  };

  const handleUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if max image limit is reached
    // if (productData.product_image_prev.length >= 4) {
    //   alert("You can upload a maximum of 2 images.");
    //   return;
    // }

    // Validate file type (allow only images)
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

    setProductData((prev) => {
      const newImagesPrev = [...prev.product_image_prev];
      const newImages = [...prev.product_image];

      // Ensure we don't exceed 4 images

      while (newImagesPrev.length < 4) newImagesPrev.push(null);
      while (newImages.length < 4) newImages.push(null);

      newImagesPrev[index] = imageUrl;
      newImages[index] = file;

      return {
        ...prev,
        product_image_prev: newImagesPrev,
        product_image: newImages,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Apply sentence case to certain fields
    if (name === "name") {
      updatedValue = toTitleCase(value); // 🔁 use toSentenceCase(value) if preferred
    }

    if (name === "description") {
      updatedValue = toSentenceCase(value); // 🔁 use toSentenceCase(value) if preferred
    }

    setProductData((prev) => {
      let discountedPrice = prev.discounted_price;

      // Auto calculate discounted price
      if (name === "price" || name === "discount_percentage") {
        const price =
          name === "price" ? parseFloat(value) : parseFloat(prev.price);
        let discount =
          name === "discount_percentage"
            ? parseFloat(value)
            : parseFloat(prev.discount_percentage);

        if (!isNaN(price)) {
          if (price === 0) {
            discount = 0;

            // 🔄 Set discount_percentage in state to 0 to reflect in UI
            setProductData((prevData) => ({
              ...prevData,
              discount_percentage: 0,
            }));
          }

          if (!isNaN(discount)) {
            discountedPrice = price - (price * discount) / 100;
          }
        }
      }

      if (name === "category") {
        const selectedCategory = categories.find((cat) => cat.name === value);
        return {
          ...prev,
          category: selectedCategory ? selectedCategory.name : "",
          category_id: selectedCategory ? selectedCategory.id : "",
        };
      }

      let updatedProductData = {
        ...prev,
        [name]: updatedValue,
        discounted_price: discountedPrice,
      };

      if (prev.gst) {
        const gstRate = parseFloat(prev.gst);
        const taxFraction = gstRate / 100;
        const basePrice = discountedPrice / (1 + taxFraction);
        const totalTax = discountedPrice - basePrice;
        const cgst = totalTax / 2;
        const sgst = totalTax / 2;
  
        updatedProductData = {
          ...updatedProductData,
          taxable_value: basePrice.toFixed(2),
          cgst_inr: cgst.toFixed(2),
          sgst_inr: sgst.toFixed(2),
        };
      }
  
      return updatedProductData;
    });
  };

  const handleGstCalculate = (gstValue) => {
    const gstRate = parseFloat(gstValue);
    const totalPrice = parseFloat(productData.discounted_price);
  
    if (isNaN(gstRate) || isNaN(totalPrice)) {
      return; // avoid alert spamming, silently ignore invalid cases
    }
  
    const taxFraction = gstRate / 100;
    const basePrice = totalPrice / (1 + taxFraction);
    const totalTax = totalPrice - basePrice;
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
  
    setProductData((prev) => ({
      ...prev,
      taxable_value: basePrice.toFixed(2),
      cgst_inr: cgst.toFixed(2),
      sgst_inr: sgst.toFixed(2),
    }));
  };
  

  // ✅ Corrected `handleClearAllImages`
  const handleClearAllImages = async () => {
    const { id: productId, product_image_prev } = productData;

    if (!selectedSection || !productId) {
      console.error("Cannot clear images: Missing section or productId", {
        selectedSection,
        productId,
      });
      return;
    }

    const imageUrls = product_image_prev.filter(Boolean);

    if (imageUrls.length === 0) {
      console.log("⚠ No images to delete!");
      return;
    }

    console.log("🔹 Dispatching deleteProductImage with:", {
      selectedSection,
      productId,
      imageUrls,
    });

    await Promise.all(
      imageUrls.map((url) =>
        dispatch(
          deleteProductImage({ selectedSection, productId, imageUrl: url })
        )
      )
    );

    setProductData((prev) => ({
      ...prev,
      product_image_prev: [],
      product_image: [],
    }));

    console.log("✅ Images cleared successfully!");
  };

  const handleSubmit = async () => {
    console.log(
      "Submitting product:",
      productData,
      "Section:",
      selectedSection
    );
    if (!validateFields()) {
      console.log("something Missing");
      toast.warning("something is missing");
      return;
    }
    // Find only updated fields
    const updatedFields = {};
    Object.keys(productData).forEach((key) => {
      if (JSON.stringify(productData[key]) !== JSON.stringify(product?.[key])) {
        updatedFields[key] = productData[key];
      }
    });
    console.log(productData.gst);
    console.log(productData.cgst_inr);
    console.log(productData.sgst_inr);
    
    
    

    if (product?.id) {
      console.log("Updating product...");
      if (Object.keys(updatedFields).length > 0) {
        await dispatch(
          updateProducts({
            productId: product.id,
            section: selectedSection,
            updateProducts: updatedFields,
          })
        );
      }
    } else {
      console.log("Adding new product...");
      await dispatch(addProduct({ productData, section: selectedSection }));
    }
    onClose();
  };

  const martCategories = categories.filter((cat) =>
    ["mart", "restaurant", "gym", "salon"].includes(cat.section.toLowerCase())
  );

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-auto max-h-[86vh] bg-white shadow min-w-[40vw] rounded-xl ">
      <div className="h-10 bg-red-500 p-2 text-2xl flex rounded-t-xl">
        <p className="text-lg font-bold m-auto text-white">Add New Product</p>
      </div>
      <form className="p-9 grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              type="text"
              className="pl-2 max-w-80 border rounded-full"
            />
            {errors.name && (
              <p className="text-red-500 text-[14px]">{errors.name}</p>
            )}
          </div>

          <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <label>HSN Code</label>
                <input
                  name="hsn_code"
                  value={productData.hsn_code}
                  onChange={handleChange}
                  type="number"
                  className="pl-2 max-w-32 border rounded-full"
                />
                {/* {errors.hsn_code && (
                  <p className="text-red-500 text-[14px]">{errors.hsn_code}</p>
                )} */}
              </div>  

            <div className="flex flex-col gap-1">
              <label>MRP</label>
              <div className="relative">
                <div className="absolute top-[1px] left-[1px] bg-gray-200 p-1 rounded-l-full border-r">
                  <LuIndianRupee />
                </div>
                <input
                  name="price"
                  value={productData.price || ""}
                  onChange={handleChange}
                  type="number"
                  className="pl-7 max-w-30 border rounded-full"
                />
                {errors.price && (
                  <p className="text-red-500 text-[14px]">{errors.price}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <label>Discount</label>
              <div className="relative">
                <div className="absolute top-[1px] left-[1px] bg-gray-200 p-1 rounded-l-full border-r">
                  <MdOutlinePercent />
                </div>
                <input
                  name="discount_percentage"
                  type="number"
                  value={productData.discount_percentage}
                  onChange={handleChange}
                  className="pl-7 max-w-24 border rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <label>Current Price</label>
              <div className="relative">
                <div className="absolute top-[1px] left-[1px] bg-gray-200 p-1 rounded-l-full border-r">
                  <LuIndianRupee />
                </div>
                <input
                  name="discounted_price"
                  type="number"
                  disabled
                  value={productData.discounted_price}
                  className="pl-7 max-w-24 border rounded-full bg-gray-200 cursor-no-drop"
                />
              </div>
            </div>
            <div className="flex flex-col w-25 gap-1">
              <label>GST (%)</label>
              <select
                name="gst"
                value={productData.gst}
                onChange={(e) => {
                  handleChange(e);         
                  handleGstCalculate(e.target.value);  
                }}
                className="pl-2 max-w-72 border rounded-full"
              >
                <option value="">Select</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
              </select>
              {errors.gst && (
                <p className="text-red-500 text-[14px]">{errors.gst}</p>
              )}

            </div>
          </div>
              {productData.cgst_inr && (
                <div className=" flex">
                  <p>
                    <strong>CGST:</strong> ₹{productData.cgst_inr}
                  </p>
                  <p>
                    <strong>SGST:</strong> ₹{productData.sgst_inr}
                  </p>
                  <p>
                    <strong>Taxable Price:</strong> ₹{productData.taxable_value}
                  </p>
                </div>
              )}

          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              type="text"
              className="pl-2  border rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-[14px]">{errors.description}</p>
            )}
          </div>

          {/* Display the added benefits */}
          <div className="flex flex-col gap-2">
            <label className=" capitalize">
              {featureKey.replace("_", " ")}
            </label>
            <div className="flex gap-2">
              <input
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                className="pl-2 p-1 border rounded-lg w-64"
                placeholder={`Enter ${featureKey}...`}
              />

              <button
                type="button"
                onClick={addFeature}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {errors[featureKey] && (
              <p className="text-red-500 text-[14px]">{errors[featureKey]}</p>
            )}
            {productData[featureKey]?.length > 0 && (
              <ul className="mt-2 border max-h-28 px-5 overflow-auto">
                {productData[featureKey].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mt-1 max-w-72"
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
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-10">
          <div className="flex gap-5 justify-between">
            <div className="flex flex-col w-32 gap-1">
              <label>Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="pl-2 max-w-72 border rounded-full"
              >
                <option value="">Select</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  martCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
              {errors.category && (
                <p className="text-red-500 text-[14px]">{errors.category}</p>
              )}
            </div>

            {["mart", "restaurent"].includes(selectedSection) && (
              <div className="flex flex-col gap-1">
                <label>Stock Quantity</label>
                <input
                  name="stock_quantity"
                  value={productData.stock_quantity}
                  onChange={handleChange}
                  type="number"
                  className="pl-2 max-w-32 border rounded-full"
                />
                {errors.stock_quantity && (
                  <p className="text-red-500 text-[14px]">
                    {errors.stock_quantity}
                  </p>
                )}
              </div>
            )}

            {["salon", "gym"].includes(selectedSection) && (
              <div className="flex flex-col gap-1">
                <label>Duration</label>
                <input
                  name="duration"
                  value={productData.duration}
                  onChange={handleChange}
                  type="text"
                  className="pl-2 max-w-32 border rounded-full"
                />
                {errors.duration && (
                  <p className="text-red-500 text-[14px]">{errors.duration}</p>
                )}
              </div>
            )}
          </div>
          {/* Main 4 Image Upload Containers */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-32 w-32 border flex items-center justify-center relative rounded"
              >
                {productData.product_image_prev[index] ? (
                  <div className="relative h-full w-full">
                    <img
                      src={productData.product_image_prev[index]}
                      alt={`Preview ${index}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute z-10 top-0 right-0 bg-black/70 text-white cursor-pointer "
                    >
                      <RxCross2 />
                    </button>
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
                      onChange={(e) => handleUpload(e, index)}
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
            className="flex items-center gap-2 border cursor-pointer px-3 py-2 rounded-full"
            onClick={handleClearAllImages}
            type="button"
          >
            <MdDeleteForever className="text-xl" />
            <p>Clear Images</p>
          </button>
          <div className="flex  items-end gap-5">
            <button
              type="button"
              className="flex items-center gap-2 border cursor-pointer px-5 py-2 rounded-full bg-red-500 font-semibold text-white "
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="flex items-center gap-2 border cursor-pointer px-6 py-2 rounded-full bg-green-600 font-semibold text-white"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          {/* Upload More Button */}
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
