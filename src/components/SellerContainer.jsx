import { useEffect, useState } from "react";
import Card from "./atoms/Card";
import supabase from "../supabaseClient";
import { FaPerson } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RxScissors } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";

const segments = ["mart", "restaurant", "gym", "salon"];

const SellerContainer = () => {
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

    for (let segment of segments) {
      const { count, error } = await supabase
        .from("sellers")
        .select("*", { count: "exact", head: true })
        .eq("segment", segment);

      if (error) {
        console.error(`Error fetching count for ${segment}:`, error.message);
        tempCounts[segment] = "Error";
      } else {
        tempCounts[segment] = count;
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

  if (loading) return <p>Loading Category counts...</p>;
  return (
    <div className="p-5 rounded bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-2">Sellers</h2>
      <div className="grid grid-cols-5 space-x-5">
        <Card
          name="Seller"
          className="bg-yellow-100"
          total={total}
          icon={<FaPerson />}
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
        <Card
          name="Gym"
          className="bg-[#F3E8FF]"
          total={counts.gym}
          icon={icons.gym}
        />
        <Card
          name="Salon"
          className="bg-[#FFF4DE]"
          total={counts.salon}
          icon={icons.salon}
        />
      </div>
    </div>
  );
};

export default SellerContainer;
