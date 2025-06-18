import supabase from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const fetchCategory = async (section) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("section", section)
      .order("name", {ascending: true});
    if (!error) {
      return data;
    }
  } catch (error) {
    console.error("error to fetching Category", error.message);
  }
};

const uploadCategoryIcon = async (file, categoryId, section) => {
  if (!file) {
    console.error("No file provided for upload.");
    toast.warning("No file provided for upload.");
    return null;
  }

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${section}/category_icons/${categoryId}/${fileName}`;

  const { error } = await supabase.storage
    .from("sections")
    .upload(filePath, file);
  if (error) {
    console.error("Error uploading category image:", error);
    toast.error("Icon cannot be upload");
    return null;
  }

  return supabase.storage.from("sections").getPublicUrl(filePath).data
    .publicUrl;
};

export const addCategoryApi = async (categoryData) => {
  const categoryId = uuidv4();
  const iconUrl = await uploadCategoryIcon(
    categoryData.icon,
    categoryId,
    categoryData.section
  );

  if (!iconUrl) {
    console.error("Failed to upload category image");
    toast.error("Icon Not Found");
    return null;
  }
  const newCategory = {
    id: categoryId,
    name: categoryData.name,
    icon: iconUrl, // Store only image URL
    section: categoryData.section,
  };

  console.log("section", newCategory.section);

  const { data, error } = await supabase
    .from("categories")
    .insert([newCategory]);

  if (error) {
    console.error("Error adding category:", error);
    return null;
  } else {
    toast.success("Category addes successfully");
    console.log("Category added successfully");
  }
  return data;
};

export const deleteCategoryApi = async (categoryId) => {
  try {
    // Step 1: Fetch category details to get the icon path
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("icon, section")
      .eq("id", categoryId)
      .single();

    if (fetchError) throw new Error(fetchError.message);
    if (!category?.icon) throw new Error("Icon URL not found");

    console.log("Delete category data:", category);
    console.log(category.section);

    // ✅ Define the folder path (Only category_icons/{categoryId})
    const folderPath = `${category.section}/category_icons/${categoryId}`;

    console.log("Deleting folder:", folderPath);

    // ✅ Step 2: List all files inside the specific categoryId folder
    const { data: files, error: listError } = await supabase.storage
      .from("sections") // Ensure this is the correct bucket name
      .list(folderPath);

    if (listError) throw new Error(`Error listing files: ${listError.message}`);
    if (!files || files.length === 0) {
      console.warn("No files found in folder, skipping deletion.");
    } else {
      // ✅ Step 3: Delete all files inside category_icons/{categoryId}
      const filePaths = files.map((file) => `${folderPath}/${file.name}`);

      const { error: storageError } = await supabase.storage
        .from("sections")
        .remove(filePaths);

      if (storageError)
        throw new Error(`Storage error: ${storageError.message}`);
      console.log("Files deleted successfully from storage:", filePaths);
      toast.success("Icon Deleted successfully");
    }

    // ✅ Step 4: Delete the category from the database
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (deleteError) throw new Error(`Database error: ${deleteError.message}`);
    console.log("Category deleted successfully.");
    toast.success("Category Deleted Successfully");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw new Error(error.message);
  }
};

const deleteIcon = async (filePath) => {
  try {
    console.log("📌 Attempting to delete:", filePath);
    const decodedFilePath = decodeURIComponent(filePath);
    console.log(decodedFilePath);

    const { error } = await supabase.storage
      .from("sections")
      .remove([decodedFilePath]);

    if (error) {
      console.error("❌ Supabase Error Deleting:", error);
      toast.error("Error deleting icon");
      return false;
    } else {
      console.log("Icon deleted successfully");
      toast.success("Icon Deleted Successfully");
    }

    // Double-check if file is still in storage
    const { data: filesAfterDelete } = await supabase.storage
      .from("sections")
      .list(filePath);
    const stillExists = filesAfterDelete.some(
      (file) => file.name === filePath.split("/").pop()
    );

    if (stillExists) {
      console.error("❌ File still exists after delete!");
      toast.error("Deletion failed: File still exists!");
      console.log(stillExists);
      return false;
    }
    return true;
  } catch (error) {
    console.error("❌ Exception in deleteIcon:", error);
    toast.error("Error: Icon delete failed");
    return false;
  }
};

const updateIcon = async (newFile, categoryId, section) => {
  try {
    const folderPath = `${section}/category_icons/${categoryId}`;
    const fullFilePath = `${folderPath}/${newFile.name}`;

    // Upload new icon
    const { data, error } = await supabase.storage
      .from("sections")
      .upload(fullFilePath, newFile, { upsert: false });
    if (error) {
      console.error("❌ Error uploading file:", error);
      toast.error("Error uploading file");
      return null;
    }

    console.log("File uploaded successfully", data);
    toast.success("Icon uploaded successfully");

    // Get the new file's public URL
    const { data: urlData } = supabase.storage
      .from("sections")
      .getPublicUrl(fullFilePath);
    return urlData.publicUrl;
  } catch (error) {
    console.error("File uploading Error", error);
    toast.error("File uploading Error");
    return null;
  }
};

export const updateCategoryApi = async (categoryData) => {
  try {
    const categoryId = categoryData.id;
    console.log("📌 Category ID:", categoryId);
    console.table(categoryData);

    let newIconUrl = categoryData.iconPreview; // Default to existing preview
    console.log("📌 New icon URL:", newIconUrl);

    // Fetch old icon URL
    const { data, error } = await supabase
      .from("categories")
      .select("icon, section")
      .eq("id", categoryId);
    console.table(data);

    if (error) {
      console.error("❌ Error fetching old icon:", error);
      toast.error("Error fetching category details");
      return;
    }

    const oldIconUrl = data?.[0]?.icon || "";
    console.log("📌 Old icon URL:", oldIconUrl);

    // Check if a new file is uploaded
    if (categoryData.icon instanceof File) {
      console.log("📌 New icon detected, updating...");

      // If the old icon exists and is valid, delete it BEFORE uploading a new one
      if (oldIconUrl.includes("/sections/")) {
        const extractFilePath = oldIconUrl.split("/sections/")[1];
        console.log("📌 Extracted file path for deletion:", extractFilePath);

        const isDeleted = await deleteIcon(extractFilePath);
        if (!isDeleted) {
          console.warn(
            "⚠️ Old icon could not be deleted, skipping upload to prevent overwriting."
          );
          return;
        }
      } else {
        console.log("⚠️ No valid old icon URL found, skipping deletion.");
      }

      // Upload new icon & get public URL
      newIconUrl = await updateIcon(
        categoryData.icon,
        categoryId,
        categoryData.section
      );
      console.log("📌 New icon URL:", newIconUrl);

      if (!newIconUrl) {
        throw new Error("New icon URL is null. Upload failed.");
      }
    } else {
      console.log("📌 No new icon provided, keeping existing one.");
    }

    // Prepare category update payload
    let updateCategory = {
      name: categoryData.name,
      ...(newIconUrl && { icon: newIconUrl }), // Update icon only if a new one exists
    };

    console.log("📤 Updating category in DB:", updateCategory);

    // Update category in Supabase
    const { data: updatedData, error: updatingError } = await supabase
      .from("categories")
      .update(updateCategory)
      .eq("id", categoryId)
      .select("*");

    if (updatingError) {
      console.error("❌ Error updating category:", updatingError);
      toast.error("Error updating category");
    } else {
      console.log("✅ Category updated successfully", updatedData);
      toast.success("Category updated successfully");
      return updatedData;
    }
  } catch (error) {
    console.error("Error updating category:", error.message);
    toast.error("Error updating category");
    throw new Error(error.message);
  }
};

export const fetchbannersApi = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*").order("name", {ascending: true});
    if (!error) {
      return data;
    }
    return data;
  } catch (error) {
    console.error("Error to fetching banner", error.message);
  }
};

const uploadBanner = async (bannerFiles, categoryId, section) => {
  console.log(bannerFiles);
  console.log(categoryId);
  console.log(section);

  if (!Array.isArray(bannerFiles) || bannerFiles.length === 0) return [];

  const uploadBannerUrl = await Promise.all(
    bannerFiles.map(async (file) => {
      if (!file || !file.name) {
        console.error("Invalid file detected:", file);
        return null;
      }
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${section}/bannersss/${categoryId}/${fileName}`;
      console.log("banner File", file);

      const { error } = await supabase.storage
        .from("sections")
        .upload(filePath, file);

      if (error) {
        console.error(`Error uploading ${file.name}:`, error.message);
        return null;
      } else {
        console.log(`${file.name} uploaded successfully!`);
      }

      return supabase.storage.from("sections").getPublicUrl(filePath).data.publicUrl;
    })
  );

  console.log(uploadBannerUrl);

  return uploadBannerUrl.filter((url) => url !== null);
};

export const addHomeSliderApi = async (bannerData, categoryId, section) => {
  try {
    console.log(bannerData, categoryId, section);

    let bannerFiles = bannerData.bannerImages;

    if (!Array.isArray(bannerFiles) || bannerFiles.length === 0) {
      console.warn("No valid images found. Skipping upload.");
      return existingData?.banner_urls || []; // Return existing banners
    }

    bannerFiles = bannerFiles.filter((file) => file instanceof File);

    if (bannerFiles.length === 0) {
      console.warn("No valid images found. Skipping upload.");
    }

    if (!categoryId) {
      console.error("Invalid categoryId:", categoryId);
      return null;
    }

    // ✅ Fetch existing category data first
    const { data: existingData, error: fetchError } = await supabase
      .from("categories")
      .select("banner_urls, descriptions")
      .eq("id", categoryId)
      .single();

    if (fetchError) {
      console.error("Error fetching existing banner URLs:", fetchError.message);
      return null;
    }

    const existingBanners = existingData?.banner_urls || [];
    const existingDescription = existingData?.descriptions|| [];

    const newBannerUrls = await uploadBanner(bannerFiles, categoryId, section);

    console.log("Existing URLs:", existingBanners);
    console.log("New Uploaded URLs:", newBannerUrls);

    // ✅ Merge existing and new banners
    const updatedBannerUrls = [...existingBanners, ...newBannerUrls];
    const updateDescription = Array.from(new Set([...existingDescription, ...bannerData.descriptions]));


    // ✅ Update category with the merged banner URLs
    const { data, error } = await supabase
      .from("categories")
      .update({
        descriptions: updateDescription,
        banner_urls: updatedBannerUrls,
      })
      .eq("id", categoryId)
      .select("*");

    if (error) {
      console.log("Error adding banner:", error.message);
      return null;
    } else {
      console.log("Banner added successfully!", data);
      toast.success("Banner Added successfully")
      return data;
    } 
  } catch (error) {
    console.error("Error updating category:", error.message);
    toast.error("Error updating category");
    throw error;
  }
};

export const deleteImageFromStorage = async (imageUrl) => {
  try {
    console.log("Original Image URL:", imageUrl);

    // Extract the correct file path after "/public/"
    const imagePath = decodeURIComponent(imageUrl.split("/sections/")[1]);
    console.log("Extracted Image Path:", imagePath);

    // Delete file from Supabase storage
    const { data, error } = await supabase.storage
      .from("sections") // Bucket name
      .remove([imagePath]);

    if (error) {
      console.error("Image cannot be deleted:", error.message);
    } else {
      console.log("Image deleted successfully from storage:", data);
      toast.success("Banner deleted successfully")
    }
  } catch (error) {
    console.error("Unexpected error while deleting image:", error);
  }
};

export const removeBannerSlider = async (categoryId, imageUrl, description) => {
  try {
    console.log(categoryId);
    console.log(imageUrl);

    const { data: category, error: fetchingError } = await supabase
      .from("categories")
      .select("banner_urls, descriptions")
      .eq("id", categoryId)
      .single();

    if (fetchingError) {
      console.error("error to fetch", fetchingError);
    } else {
      console.log(category);
    }

    console.log("Banner URLs in DB:", category.banner_urls);
    console.log("Image URL to remove:", imageUrl);

    const updateBannerUrl = category.banner_urls.filter(
      (url) => url !== imageUrl
    );

    const updateDescription = category.descriptions.filter(
      (desc) => desc !== description
    );

    console.log(updateBannerUrl);
    console.log(updateDescription);

    const { data, error } = await supabase
      .from("categories")
      .update({ banner_urls: updateBannerUrl, descriptions: updateDescription })
      .eq("id", categoryId)
      .single();

    if (error) {
      console.error("error to remove banner", error);
    } else {
      console.log(data);
      toast.success("Banner removed successfully")
    }
  } catch (error) {
    console.error("Error updating category:", error.message);
    toast.error("Error updating category");
    throw error;
  }
};
