import { v4 as uuidv4 } from "uuid";
import supabase from "../../supabaseClient";
import { toast } from "react-toastify";

const uploadImages = async (files, productId, section) => {
  if (!Array.isArray(files) || files.length === 0) return [];

  const uploadedUrls = await Promise.all(
    files.map(async (file, index) => {
      if (!file || !file.name) {
        console.error("Invalid file detected:", file);
        return null;
      }

      const fileName = `${index + 1}_${file.name}`;
      console.log("file", file);

      const filePath = `${section}/product_images/${productId}/${fileName}`;

      const { error } = await supabase.storage
        .from("sections")
        .upload(filePath, file, {upsert: true});

      if (error) {
        console.error("Error uploading image:", error);
        return null;
      }

      return supabase.storage.from("sections").getPublicUrl(filePath).data
        .publicUrl;
    })
  );

  return uploadedUrls.filter((url) => url !== null);
};

const addProductToDB = async (selectedSection, productData) => {
  console.log("Hii from add Product api");
  const productId = uuidv4();

  console.log(selectedSection);
  console.log(productData);

  // Convert Blob URLs to File objects (if necessary)
  let imageFiles = productData.product_image || [];
  console.log(imageFiles);

  // Ensure files are valid File objects
  if (!Array.isArray(imageFiles)) {
    console.error("Invalid image format:", imageFiles);
    return null;
  }

  // **Filter out blob URLs**
  imageFiles = imageFiles.filter((file) => file instanceof File);
  console.log(imageFiles);

  if (imageFiles.length === 0) {
    console.warn("No valid images found. Skipping upload.");
  }

  const imageUrls = await uploadImages(imageFiles, productId, selectedSection);

  let newProduct = {
    id: productId,
    name: productData.name,
    price: productData.price,
    discount_percentage: productData.discount_percentage,
    taxable_price: productData.taxable_value,
    description: productData.description,
    image_urls: imageUrls,
    gst: productData.gst,
    cgst_inr: productData.cgst_inr,
    sgst_inr: productData.sgst_inr,
    hsn_code: productData.hsn_code,
    category_id: productData.category_id,
  };

  switch (selectedSection) {
    case "mart":
      newProduct.benefits = productData.benefits;
      newProduct.stock_quantity = productData.stock_quantity;
      break;
    case "restaurant":
      newProduct.ingredients = productData.ingredients;
      break;
    case "gym":
      newProduct.facilities = productData.facilities;
      newProduct.duration = productData.duration;
      break;
    case "salon":
      newProduct.highlights = productData.highlights;
      newProduct.duration = productData.duration;
      break;
    default:
      console.error("Invalid section selected.");
      return null;
  }

  const tableName = ["mart", "restaurant"].includes(selectedSection)
    ? `${selectedSection}_products`
    : `${selectedSection}_services`;
  console.log(tableName);

  const { data, error } = await supabase
    .from(tableName)
    .insert([newProduct])
    .select("*");

  if (error) {
    console.error("Error adding product:", error);
    toast.error("Error adding product:");
    return null;
  } else {
    console.log("Product added successfully:", data);
    toast.success("Product added successfully:");
    return data;
  }
};

const fetchProducts = async (page, section) => {
  const list = localStorage.getItem("list");
  console.log(list);

  if (!list) throw new Error("No product/service selected");

  if (!section) throw new Error("No section selected");

  console.log("Selected Section:", section);

  const limit = 10;
  const offset = page * limit;

  const tableWithoutCategory = ["gym_products", "gym_nutrition", "gym_workout"];

  const tableName = `${section}_${list}`;

  console.log("Fetching from table:", tableName);

  try {
    if (tableWithoutCategory.includes(tableName)) {
      // console.log(tableWithoutCategory);

      const result = await supabase
        .from(tableName)
        .select("*")
        .order("name", { ascending: true })
        .range(offset, offset + limit - 1);

      if (result.error) {
        console.error(`Error fetching from ${tableName}:`, result.error);
        throw result.error;
      }

      return result.data;
    } else {
      const result = await supabase
        .from(tableName)
        .select(
          `*, categories (
              id,
              name
            )`
        )
        .order("name", { ascending: true })
        .range(offset, offset + limit - 1);

      if (result.error) {
        console.error(`Error fetching from ${tableName}:`, result.error);
        throw result.error;
      }
      console.log(result.data);

      return result.data;
    }
  } catch (err) {
    console.error("Error in fetchProducts:", err);
  }
};

const   deleteProductApi = async (section, productId) => {
  try {
    if (!section) throw new Error("Section is required");
    if (!productId) throw new Error("Product ID is required");

    const tableName =
      section === "mart" || section === "restaurant"
        ? `${section}_products`
        : `${section}_services`;

    // 🛠 Fetch the product to get image_urls before deletion
    const { data: deleting_data, error } = await supabase
      .from(tableName)
      .select("image_urls, id")
      .eq("id", productId)
      .single(); // Fetch only one record

    if (error) throw new Error(`Fetch Error: ${error.message}`);
    if (!deleting_data) {
      console.warn("⚠️ Product not found, skipping deletion.");
      return;
    }

    console.log("✅ Deleting Product data:", deleting_data);
    // toast.success("Deleting Product data");

    // 🛠 Storage: Get all files inside the product folder
    const folderPath = `${section}/product_images/${productId}`;
    console.log("📂 Deleting Folder path:", folderPath);

    const { data: files, error: listError } = await supabase.storage
      .from("sections")
      .list(folderPath);

    if (listError) {
      console.warn("⚠️ Error listing files in storage:", listError.message);
    } else if (!files || files.length === 0) {
      console.warn("⚠️ No files found in folder, skipping storage deletion.");
    } else {
      // Delete all images inside the folder
      const filePaths = files.map((file) => `${folderPath}/${file.name}`);
      const { error: storageError } = await supabase.storage
        .from("sections")
        .remove(filePaths);

      if (storageError) {
        console.error("❌ Storage error:", storageError.message);
      } else {
        console.log("✅ Files deleted successfully from storage:", filePaths);
        toast.success("Files deleted successfully from storage");
      }
    }

    // 🛠 Database: Clear image_urls before deleting the product
    if (deleting_data.image_urls && deleting_data.image_urls.length > 0) {
      const { error: dbError } = await supabase
        .from(tableName)
        .update({ image_urls: [] }) // Clear image URLs
        .eq("id", productId);

      if (dbError) {
        console.error("❌ Error updating image_urls:", dbError.message);
      } else {
        console.log("✅ image_urls cleared successfully from DB");
        // toast.success("✅ image_urls cleared successfully from DB");
      }
    }

    // 🛠 Delete product from database
    const { error: deletingError } = await supabase
      .from(tableName)
      .delete()
      .eq("id", productId);
    if (deletingError) {
      console.error("❌ Error deleting product:", deletingError.message);
      toast.error("Error deleting product");
    } else {
      console.log("✅ Product Data Deleted Successfully");
      toast.success("Product Data Deleted Successfully");
    }
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    toast.error("Error deleting product");
    throw new Error(error.message);
  }
};

const updateProductApi = async (section, productId, updateProducts) => {
  try {
    console.log(section, productId, updateProducts);
    if (!section) throw new Error("Section is required");
    const tableName =
      section === "mart" || section === "restaurant"
        ? `${section}_products`
        : `${section}_services`;
    let imageUrls = updateProducts.image_urls;
    if (
      updateProducts.product_image &&
      updateProducts.product_image.length > 0
    ) {
      imageUrls = await uploadImages(
        updateProducts.product_image,
        productId,
        section
      );
      if (!imageUrls.length) {
        console.error("Failed to upload new product images");
        return null;
      }
    } else {
      imageUrls = updateProducts.image_urls; // Keep existing URLs if no new images
    }

    const updateData = {
      id: productId,
      name: updateProducts.name,
      image_urls: imageUrls,
      price: updateProducts.price,
      discount_percentage: updateProducts.discount_percentage,
      taxable_price: updateProducts.taxable_value,
      gst: updateProducts.gst,
      cgst_inr: updateProducts.cgst_inr,
      sgst_inr: updateProducts.sgst_inr,
      hsn_code: updateProducts.hsn_code,
      description: updateProducts.description,
      category_id: updateProducts.category_id,
    };

    switch (section) {
      case "mart":
        updateData.benefits = updateProducts.benefits;
        updateData.stock_quantity = updateProducts.stock_quantity;
        break;

      case "restaurant":
        updateData.ingredients = updateProducts.ingredients;
        break;

      case "gym":
        updateData.facilities = updateProducts.facilities;
        updateData.duration = updateProducts.duration;
        break;

      case "salon":
        updateData.highlights = updateProducts.highlights;
        updateData.duration = updateProducts.duration;
        break;

      default:
        console.error("Invalid section selected.");
        return null;
    }

    const { data, error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq("id", productId)
      .select(`*,   categories( id, name )`); // ✅ Fetch updated row

    if (error) {
      console.error("Error updating product:", error.message);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from update query.");
    }

    console.log("✅ Product updated successfully:", data[0]);
    toast.success("✅ Product updated successfully");

    return data[0]; // ✅ Return updated product
  } catch (error) {
    console.error("Error updating product:", error.message);
    toast.error("Error updating product");
    throw new Error(error.message);
  }
};

const deleteAllImage = async (selectedSection, productId, imageUrls) => {
  try {
    if (!Array.isArray(imageUrls)) {
      imageUrls = [imageUrls]; // Convert a single string to an array
    }

    // Extract file paths from URLs
    const extractFilePathFromUrl = (url) =>
      decodeURIComponent(url.split("/public/")[1]);

    let filePaths = imageUrls.map(extractFilePathFromUrl);

    // Ensure correct file paths by removing "sections/" prefix if needed
    filePaths = filePaths.map((path) =>
      path.startsWith("sections/") ? path.replace("sections/", "") : path
    );

    console.log("🗑 Deleting files:", filePaths);

    if (filePaths.length === 0) {
      console.warn("⚠ No valid file paths to delete.");
      return;
    }

    // Delete images from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("sections")
      .remove(filePaths);

    if (storageError) {
      console.error("❌ Error deleting files from storage:", storageError);
      return;
    }
    console.log("✅ Files deleted successfully from storage");
    toast.success("✅ Files deleted successfully from storage");

    // Ensure section and productId are valid
    if (!selectedSection || !productId) {
      throw new Error("selectedSection and Product ID are required");
    }

    // Determine correct table name
    const tableName =
      selectedSection === "mart" || selectedSection === "restaurant"
        ? `${selectedSection}_products`
        : `${selectedSection}_services`;

    // Update database to remove image URLs
    const { error: dbError } = await supabase
      .from(tableName)
      .update({ image_urls: [] }) // Clear image URLs
      .eq("id", productId);

    if (dbError) {
      console.error("❌ Error updating image_urls:", dbError);
    } else {
      console.log("✅ image_urls cleared successfully from DB");
      toast.success("✅ image_urls cleared successfully from DB");
    }
  } catch (error) {
    console.error("❌ Error deleting images:", error.message);
    toast.error("❌ Error deleting images:", error.message);
    throw new Error(error.message);
  }
};

const searchProductApi = async (page, section, searchQuery) => {
  console.log(searchQuery);
  console.log(page);

  const limit = 10;
  const offset = page * limit;

  const list = localStorage.getItem("list");
  console.log(list);

  if (!list) throw new Error("No product/service selected");

  if (!section) throw new Error("No section selected");

  console.log("Selected Section:", section);

  const tableWithoutCategory = ["gym_products", "gym_nutrition", "gym_workout"];

  const tableName = `${section}_${list}`;

  console.log("Fetching from table:", tableName);

  try {
    if (tableWithoutCategory.includes(tableName)) {
      // console.log(tableWithoutCategory);

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .ilike("name", `%${searchQuery}%`)
        .range(offset, offset + limit - 1);

      if (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        throw error;
      }

      return data;
    } else {
      const result = await supabase
        .from(tableName)
        .select(
          `*, categories (
              id,
              name
            )`
        )
        .ilike("name", `%${searchQuery}%`)
        .range(offset, offset + limit - 1);

      if (result.error) {
        console.error(`Error fetching from ${tableName}:`, result.error);
        throw result.error;
      }
      console.log(result.data);

      return result.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  addProductToDB,
  fetchProducts,
  deleteProductApi,
  deleteAllImage,
  updateProductApi,
  searchProductApi,
};
