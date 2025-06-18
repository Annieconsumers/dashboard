import supabase from "../../supabaseClient";
import { toast } from "react-toastify";

const fetchUserApi = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*").order("name", {ascending: true});
    // console.log(data);
    if (error) {
      console.log(error.message);
    }
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const feedbackUserApi = async () => {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .select(`id, message, created_at, users(*)`);
    // console.log(data);
    if (error) {
      console.log(error.message);
    }
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const updateProfilePic = async (id, file) => {
  try {
    if (!id) {
      console.log("User id not found");
      return;
    }
    if (!file) {
      console.log("Not a valid profile picture!");
      return;
    }
    const fileName = `${id}`;
    const filePath = `profile_pics/${fileName}`;

    const { error } = await supabase.storage
      .from("users")
      .upload(filePath, file,{ upsert: true});
    if (error) {
      console.error("Error uploading image:", error);
      return null;
    } else {
      toast.success("Profile Pic Uploaded Successfully");
    }

    const {data} = await supabase.storage
    .from("users")
    .getPublicUrl(filePath)

    console.log(data.publicUrl);
    return data.publicUrl

  } catch (error) {
    console.log("Error to failed upload profile Pic");
  }
};

const updateUserApi = async (userId, updateData) => {
  try {
    console.log(userId);
    console.log(updateData);
    // const profile_pic_url = updateProfilePic(userId)

    console.log(updateData.profile_pic_url);
    const profile_pic_url = await updateProfilePic(
      userId,
      updateData.profile_pic_url
    );
    console.log(profile_pic_url);

    const userData = {
      user_id: userId,
      profile_pic_url: profile_pic_url,
      email: updateData.email,
      address_line: updateData.address_line,
      city: updateData.city,
      state: updateData.state,
      postal_code: updateData.postal_code,
    };

    const { data, error } = await supabase
      .from("users")
      .update(userData, {upsert: true})
      .eq("user_id", userId)
      .select("*");

    if (error) {
      console.error("Error updating product:", error.message);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from update query.");
    } else {
      console.log("Updated Data", data);
    }
    toast.success("User updated successfully");
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export { fetchUserApi, feedbackUserApi, updateUserApi };
