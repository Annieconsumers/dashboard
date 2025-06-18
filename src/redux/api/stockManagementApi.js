import supabase from "../../supabaseClient";

export const fetchStockApi = async () => {
  try {
    const { data, error } = await supabase
      .from("stock_management")
      .select(
        `* , mart_products(id, name, price, image_urls), sellers(*, users(*))`
      );

    if (!error) {
      console.log("fetch data from supabase", data);
    } else {
      console.log("error from fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supa base");
  }
};
