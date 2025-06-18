import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { MdCategory } from "react-icons/md";
import Card from "./atoms/Card";
import { FaShop } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RxScissors } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";

const sections = ["mart", "gym", "salon", "restaurant"];

const CategoryContainer = () => {
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
        .from("categories")
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

  if (loading) return <p>Loading Category counts...</p>;
  return (
    <div className="p-5 rounded bg-white border border-gray-200">
      <h2 className="text-3xl font-bold mb-2">Categories</h2>
      <div className="grid grid-cols-5 space-x-5">
        <Card name="Category" className="bg-yellow-100" total={total} icon={<MdCategory/>} />
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

export default CategoryContainer;
