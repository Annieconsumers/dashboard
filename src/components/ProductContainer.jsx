import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RxScissors } from "react-icons/rx";
import { MdOutlineRestaurant } from "react-icons/md";
import Card from "./atoms/Card";
import supabase from "../supabaseClient";

const tables = [
  "mart_products",
  "gym_services",
  "restaurant_products",
  "salon_services",
  "gym_nutrition",
  "gym_products",
  "gym_workout",
];

const ProductContainer = () => {
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

    for (let table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error(`Error fetching count for ${table}:`, error.message);
        tempCounts[table] = "Error";
      } else {
        tempCounts[table] = count;
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

  if (loading) return <p>Loading product counts...</p>;

  return (
    <div className="p-5 rounded bg-white shadow">
      <h2 className="text-3xl font-bold mb-2">Products</h2>
      <div className="grid grid-cols-5 space-x-5">
        <Card
          name="Products"
          className="bg-yellow-100 shadow"
          total={total}
          icon={<FaBoxOpen />}
        />
        <Card
          name="Mart"
          className="bg-[#DCFCE7] shadow"
          total={counts.mart_products}
          icon={icons.mart}
        />
        <Card
          name="Restaurant"
          className="bg-[#FFE2E5] shadow"
          total={counts.restaurant_products}
          icon={icons.restaurant}
        />
        <Card
          name="Gym"
          className="bg-[#F3E8FF] shadow"
          total={
            counts.gym_services +
            counts.gym_products +
            counts.gym_workout +
            counts.gym_nutrition
          }
          icon={icons.gym}
        />
        <Card
          name="Salon"
          className="bg-[#FFF4DE] shadow"
          total={counts.salon_services}
          icon={icons.salon}
        />
      </div>
    </div>
  );
};

export default ProductContainer;
