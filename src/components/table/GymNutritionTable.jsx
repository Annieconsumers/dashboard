import {  useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import ViewAllDetails from "../preview/ViewAllDetails";
import { clearProducts, getProducts, searchedProducts } from "../../redux/slices/productSlice";
import AddNutrition from "../form/AddNutrition";
import { deleteNutrition } from "../../redux/slices/nutritionSlice";
import ViewGymNutrition from "../preview/ViewGymNutrition";


const GymNutritionTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const { products, hasMore, loading } = useSelector((state) => state.product);
    const selectedSection = useSelector(
      (state) => state.category.selectedSection
    );
    console.log(products);
    console.log(selectedSection);
    
  
    const [page, setPage] = useState(0);
    const scrollRef = useRef(null);
  
    useEffect(() => {
      dispatch(clearProducts()); // <-- Clear products on section change
      setPage(0); // Reset pagination
    }, [selectedSection, searchQuery,  dispatch]);
  
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (searchQuery.trim()) {
          dispatch(searchedProducts({ section: selectedSection, searchQuery }));
        } else {
          dispatch(getProducts({ page, section: selectedSection }));
        }
      }, 300); // debounce input to avoid excessive API calls
    
      return () => clearTimeout(delayDebounce);
    }, [searchQuery, selectedSection, page, dispatch]);
  
    useEffect(() => {
      setPage(0);
      console.log(page);
    }, [selectedSection]);
  
    useEffect(() => {
      console.log("Scroll Top:", scrollRef.current.scrollTop);
      console.log("Client Height:", scrollRef.current.clientHeight);
      console.log("Scroll Height:", scrollRef.current.scrollHeight);
    }, [scrollRef.current, products]);
  
    const handleScroll = () => {
      const scrollEl = scrollRef.current;
      if (
        scrollEl &&
        scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    useEffect(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
  
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);
  
    const [isShowNutrition, setIsShowNutrition] = useState(false);
    const [showNutrition, setShowNutrition] = useState(null);
  
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
  
    const handleEdit = (product) => {
      setEditingProduct(product);
      setIsEditing(true);
    };
  
    const handleShowNutrition = (product) => {
      setIsShowNutrition(true);
      setShowNutrition(product);
    };
  
    const handleProductDetailClose = () => {
      setIsShowNutrition(false);
      setEditingProduct(null);
    };
  
    const handleFormClose = () => {
      setIsEditing(false);
      setEditingProduct(null);
    };
  
  
    // useEffect(() => {
    //   dispatch(getProducts(selectedSection));
    // }, [dispatch, selectedSection]);
  
    const handleDelete = async (productId) => {
      if (!selectedSection) {
        alert("Erro: No section Selected");
        return;
      }
      if (!productId) {
        alert("Erro: Invalid Product Id");
        return;
      }
  
      if (window.confirm("are you sure to delete")) {
        try {
          console.log(
            `Deleting nutrition from ${selectedSection}, ID: ${productId}`
          );
          await dispatch(deleteNutrition({Id: productId }));
          await dispatch(getProducts(selectedSection));
        } catch (error) {
          console.error("Delete failed:", error.message);
          alert(`Delete failed: ${error.message}`);
        }
      }
    };
  
  return (
    <div>
    {/* Show AddProduct form when editing */}
    <div>
      <div className="m-8 flex justify-between bg-white sticky top-0 z-10">
        <h1 className="text-5xl flex font-semibold">
          Gym Nutrition
        </h1>
        <input
          type="text"
          placeholder="Search Product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border pl-2 w-96 rounded-full"
        />
      </div>
      <div ref={scrollRef} className="max-h-[85vh] overflow-y-auto">
        <table className="w-full product-table border-collapse">
          <thead className="bg-gray-200 border border-gray-300 sticky top-0">
            <tr>
              <th className="font-medium border border-gray-300 p-2">
                S. no.
              </th>
              <th className="font-medium border border-gray-300 p-2">
                Image
              </th>
              <th className="font-medium border border-gray-300 p-2">
                Product Id
              </th>
              <th className="font-medium border border-gray-300 p-2">Name</th>
              <th className="font-medium border border-gray-300 p-2">
                Protien (gm)
              </th>
              <th className="font-medium border border-gray-300 p-2">
                Calories (Cal)
              </th>
              <th className="font-medium border border-gray-300 p-2">
                Serving
              </th>
              <th className="font-medium border border-gray-300 p-2">
                Edit/Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <img
                      src={item.image_urls[0]}
                      alt=""
                      className="h-15 w-15 border m-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.id.slice(0, 8)}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.protein}
                  </td>
                  
                  <td className="border border-gray-300 p-2 text-center">
                     {item.calories}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                     {item.serving}
                  </td>
                 
                  <td className="border border-gray-300 p-2 text-center min-w-[100px] h-full">
                    <div className="inline-flex items-center text-white justify-center gap-1 w-full">
                      <button
                        type="button"
                        onClick={() => handleShowNutrition(item)}
                        className="bg-green-600 cursor-pointer text-3xl rounded-md p-1"
                      >
                        <IoEyeOutline />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 cursor-pointer text-3xl rounded-md p-1"
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!item?.id) {
                            console.error("❌ Product ID is missing:", item);
                            alert("Error: Missing product ID!");
                            return;
                          }
                          handleDelete(item.id);
                        }}
                        className="bg-red-500 cursor-pointer text-3xl rounded-md p-1"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

    {isEditing && (
      <>
        <div
          className="fixed inset-0 bg-black/70 z-50"
          onClick={() => setShowAddCategory(false)}
        ></div>
        <div className="absolute z-1000">
          <AddNutrition
            nutrition={editingProduct}
            onClose={handleFormClose} // Pass a function to close the form
          />
        </div>
      </>
    )}

    {isShowNutrition && (
      <>
        <div
          className="fixed inset-0 bg-black/70 z-50"
          onClick={() => setIsShowNutrition(false)}
        ></div>
        <div className="absolute z-1000">
          <ViewGymNutrition
            nutrition={showNutrition}
            onClose={handleProductDetailClose}
          />
        </div>
      </>
    )}
  </div>
  )
}

export default GymNutritionTable