import supabase from "../../supabaseClient";

export const loginAdminApi = async (phone) => {
  try {
    const { data, error } = await supabase
      .from("admins")
      .select("phone_number,type,id")
      .eq("phone_number", phone);
    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};

export const fetchAdminDetailsAPI = async (adminDetails) => {
  try {
    console.log(adminDetails);
      if (!adminDetails || !adminDetails.id) {
    console.error("No admin provided to fetchAdminDetailsAPI");
    return null;
  }

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("id", adminDetails.id)
      .single();

    console.log(data);

    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};
