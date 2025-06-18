import supabase from "../../supabaseClient";

export const fetchSystemUsersApi = async () => {
  try {
    const { data, error } = await supabase
      .from("system_users")
      .select("*")
      .order("name", {ascending:true});

    if (error) {
      console.error("Error fetching view:", error);
    } else {
      console.log("View data:", data);
    }
    return data;
  } catch (error) {
    console.log("Error to fetching system error", error);
  }
};
