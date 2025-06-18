
import { useEffect, useState } from "react";
import Card from "./atoms/Card";
import supabase from "../supabaseClient";
import { FaTruck } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RxScissors } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";

const sections = ["mart", "restaurant"];

const DeliveryBoyContainer = () => {
  const icons = {
    mart: <FaShop />,
    restaurant: <MdOutlineRestaurant />,
    gym: <CgGym />,
    salon: <RxScissors />,
  };
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    let tempCounts = {};
    let totalCount = 0;

    for (let section of sections) {
      const { count, error } = await supabase
        .from("delivery_boys")
        .select("*", { count: "exact", head: true })
        .eq("section", section);

      if (error) {
        console.error(`Error fetching count for ${section}:`, error.message);
        tempCounts[section] = "Error";
      } else {
        tempCounts[section] = count;
        totalCount += count ?? 0;
      }
    }

    setCounts(tempCounts);
    setTotal(totalCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  console.log(counts);
  console.log(total);

  if (loading) return <p>Loading Delivery boys counts...</p>;
  return (
    <div className="p-5 rounded bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-2">Delivery boys</h2>
      <div className="grid grid-cols-3 space-x-5">
        <Card
          name="Delivery boy"
          className="bg-yellow-100"
          total={total}
          icon={<FaTruck />}
        />
        <Card
          name="Mart"
          className="bg-[#DCFCE7]"
          total={counts.mart}
          icon={icons.mart}
        />
        <Card
          name="Restaurant"
          className="bg-[#FFE2E5]"
          total={counts.restaurant}
          icon={icons.restaurant}
        />
       
      </div>
    </div>
  );
};

export default DeliveryBoyContainer;
