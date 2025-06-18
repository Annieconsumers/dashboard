import supabase from "../../supabaseClient";

export const fetchMartOrderApi = async () => {
  try {
    const { data, error } = await supabase
      .from("mart_order_items")
      .select(`*, orders(*,sellers(id, seller_name, gst_number, address_line_1, store_city, store_state, store_postal_code), users(user_id, name, phone_number)), mart_products(*)`);
    if (!error) {
      console.log("fetch the order data", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.error("error from supabase", error);
  }
};


export const fetchRestaurantOrderApi = async () => {
  try {
    const { data, error } = await supabase
      .from("restaurant_order_items")
      .select(`*, orders(*, sellers(id, seller_name, gst_number, address_line_1, store_city, store_state, store_postal_code), users(user_id, name, phone_number)), restaurant_products(*)`);
    if (!error) {
      console.log("fetch the order data", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.error("error from supabase", error);
  }
};

export const fetchSalonOrderApi = async() =>{
  try {
    const { data, error } = await supabase
      .from("salon_order_items")
      .select(`*, orders(*, sellers(id, seller_name, gst_number, address_line_1, store_city, store_state, store_postal_code), users(user_id, name, phone_number)), salon_services(*)`);
    if (!error) {
      console.log("fetch the order data", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.error("error from supabase", error);
  }
}

export const fetchGymOrderApi = async() =>{
  try {
    const { data, error } = await supabase
      .from("gym_order_items")
      .select(`*, orders(*, sellers(id, seller_name, gst_number, address_line_1, store_city, store_state, store_postal_code), users(user_id, name, phone_number)), gym_services(*)`);
    if (!error) {
      console.log("fetch the order data", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.error("error from supabase", error);
  }
}