import { toast } from "react-toastify";
import supabase from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";

const uploadImages = async (id, section, files) => {
  try {
    if (!Array.isArray(files) || files.length === 0) return [];
    const uploadedUrl = await Promise.all(
      files.map(async (file, index) => {
        console.log(file);

        if (!file || !file.name) {
          console.log("Invalid file detected:", file);
          return null;
        }
        const fileName = `${index + 1}_image`;
        const filePath = `${section}/gym_product/${id}/${fileName}`;

        const { error } = await supabase.storage
          .from("sections")
          .upload(filePath, file);

        if (!error) {
          return supabase.storage.from("sections").getPublicUrl(filePath).data
            .publicUrl;
        } else {
          console.log("Error uploading in supabase", error);
          return null;
        }
      })
    );
    return uploadedUrl.filter((url) => url !== null);
  } catch (error) {
    console.error("Error to upload gym product image", error);
  }
};

export const addGymProductApi = async (section, formData) => {
  try {
    const id = uuidv4();
    console.log(section);
    console.log(formData);

    const imageFiles = formData.images;
    const imageUrls = await uploadImages(id, section, imageFiles);
    console.log("images", imageUrls);

    const productData = {
      id: id,
      name: formData.name,
      stock_quantity: formData.quantity,
      hsn_code: formData.hsnCode,
      price: formData.mrp,
      discount_percentage: formData.discount,
      //   discount_price: formData.currentPrice,  //auto calculating in supabase
      gst: formData.gstPercentage,
      // taxable_price: formData.taxable_value, // auto generated in backend
      cgst_inr: formData.cgst_inr,
      sgst_inr: formData.sgst_inr,
      brand_name: formData.brand,
      description: formData.description,
      benefits: formData.benefits,
      image_urls: imageUrls,
    };
    const { data, error } = await supabase
      .from("gym_products")
      .insert([productData])
      .single();
    if (error) {
      console.log("Error to add Gym Product", error);
      toast.error("Error to add Gym Product");
      return;
    }
    toast.success("Gym Product added Successfully");
    return data;
  } catch (error) {
    console.error("Error to Adding Gym Product:", error);
  }
};

const updateImages = async (id, section, files) => {
  try {
    if (!Array.isArray(files) || files.length === 0) return [];

    const validFiles = files.filter((file) => file instanceof File);
    if (validFiles.length === 0) return [];

    const { data: existingFiles, error: listError } = await supabase.storage
      .from("sections")
      .list(`${section}/gym_product/${id}`);

    if (listError) {
      console.error("Error listing existing images:", listError);
      return [];
    }

    const usedIndices = new Set();
    existingFiles?.forEach((file) => {
      const match = file.name.match(/^(\d+)_image/);
      if (match) {
        usedIndices.add(parseInt(match[1]));
      }
    });

    let nextIndex = 1;
    const uploadedUrls = [];

    for (const file of validFiles) {
      while (usedIndices.has(nextIndex)) {
        nextIndex++;
      }

      const fileName = `${nextIndex}_image`;
      const filePath = `${section}/gym_product/${id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("sections")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
      } else {
        usedIndices.add(nextIndex);
        const { data } = supabase.storage
          .from("sections")
          .getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      }
      nextIndex++;
    }

    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    return [];
  }
};

export const updateGymProductApi = async (section, formData) => {
  try {
    console.log(section);
    console.log(formData);

    // const imageFiles = formData.files;
    // const imageUrls = await uploadImages(id, section, imageFiles);
    // console.log("images", imageUrls);

    const productId = formData.id;
    console.log(productId);
    const productImages = formData.files;


    const updateData = {
      name: formData.name,
      stock_quantity: formData.quantity,
      hsn_code: formData.hsnCode,
      price: formData.mrp,
      discount_percentage: formData.discount,
      //   discount_price: formData.currentPrice,  //auto calculating in supabase
      gst: formData.gstPercentage,
      // taxable_price: formData.taxable_value, // auto generated in backend
      // cgst_inr: formData.cgst_inr,
      // sgst_inr: formData.sgst_inr,
      brand_name: formData.brand,
      description: formData.description,
      benefits: formData.benefits,
    };

     if (productImages.some((item) => item instanceof File)) {
      // Step 1: Fetch existing image_urls
      const { data: existingRecord, error: fetchError } = await supabase
        .from("gym_products")
        .select("image_urls")
        .eq("id", productId)
        .single();

      if (fetchError) {
        console.error("Error fetching existing image URLs:", fetchError);
        toast.error("Failed to fetch existing image URLs");
        return;
      }

      // Step 2: Upload new images
      const newImageUrls = await updateImages(
        productId,
        section,
        productImages
      );

      // Step 3: Merge old + new URLs
      const existingUrls = existingRecord?.image_urls || [];
      updateData.image_urls = [...existingUrls, ...newImageUrls];
    }
    const { data, error } = await supabase
      .from("gym_products")
      .update(updateData)
      .eq("id", productId)
      .single();

    if (error) {
      console.log("Error to update gym product", error);
      toast.error("Error to update gym product");
      return;
    }
    toast.success("Gym product updated Successfully");
    return data;
  } catch (error) {
    console.error("Error to update Gym product:", error);
  }
};

export const deleteGymProductApi = async (id) => {
  try {
    console.log(id);
    const { data: deleting_data, error } = await supabase
      .from("gym_products")
      .select("image_urls")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Fetch Error: ${error.message}`);
    if (!deleting_data) {
      console.warn("⚠️ Product not found, skipping deletion.");
    }
    console.log(deleting_data);

    let imageUrls = deleting_data.image_urls
    if (Array.isArray(imageUrls)) {
      const deletePaths = imageUrls.map((item) =>
        item.split("/sections/")[1]
      );
      const { error: storageError } = await supabase.storage
        .from("section")
        .remove(deletePaths);

      if (storageError) {
        console.warn("⚠️ Some images may not have been deleted:", storageError.message);
      }
    }
    const { error: deleteError } = await supabase
      .from("gym_products")
      .delete()
      .eq("id", id);
    if (deleteError) throw new Error(`Delete Error: ${deleteError.message}`);
    toast.success("Gym Product deleted successfully");    
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    toast.error("Error deleting product");
    throw new Error(error.message);
  }
};

export const deleteProductImageAtIndex = async (rowId, indexToRemove) => {
  try {
    // Step 1: Fetch current image URLs
    const { data, error: fetchError } = await supabase
      .from("gym_products")
      .select("image_urls")
      .eq("id", rowId)
      .single();

    if (fetchError) throw new Error("Fetch error: " + fetchError.message);

    const currentImages = data?.image_urls;
    if (!Array.isArray(currentImages)) throw new Error("No image array found.");

    const imageUrlToDelete = currentImages[indexToRemove];
    const imagePath = imageUrlToDelete.split("/sections/")[1]; // adjust path split if needed

    // Step 2: Remove from Supabase storage
    const { error: storageError } = await supabase.storage
      .from("sections")
      .remove([imagePath]);

    if (storageError) throw new Error("Storage error: " + storageError.message);

    // Step 3: Remove from database array
    const updatedImages = currentImages.filter((_, i) => i !== indexToRemove);
    const { error: updateError } = await supabase
      .from("gym_products")
      .update({ image_urls: updatedImages })
      .eq("id", rowId);

    if (updateError) throw new Error("Update error: " + updateError.message);

    toast.success("Image deleted successfully.");
    return true;
  } catch (error) {
    console.error("❌ Error deleting image:", error.message);
    toast.error("Failed to delete image.");
    return false;
  }
};