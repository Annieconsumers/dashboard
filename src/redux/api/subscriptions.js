import supabase from "../../supabaseClient"

export const fetchSubcribedUser = async() =>{
    try {
        const {data, error} = await supabase
        .from("subscriptions")
        .select('*, users(*)')

        if (!error) {
            console.log("Subscribes user fetched successfully");   
        }else{
            console.log("Error to fetching subscribed User", error);
        }
        return data
    } catch (error) {
        console.log("Error to fetch data", error);
    }
}