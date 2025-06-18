import {  useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineNetworkWifi3Bar } from "react-icons/md";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { MdOutlineNetworkWifi1Bar } from "react-icons/md";
import { clearProducts, getProducts, searchedProducts } from "../../redux/slices/productSlice";
import AddWorkout from "../form/AddWorkout";
import { deleteWorkout } from "../../redux/slices/workoutSlice";
import ViewWorkoutProduct from "../preview/ViewWorkoutProduct";


const GymWorkoutTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
      const dispatch = useDispatch();
      const { products, hasMore, loading } = useSelector((state) => state.product);
      const selectedSection = useSelector(
        (state) => state.category.selectedSection
      );
      console.log(products);
    
      const [page, setPage] = useState(0);
      const scrollRef = useRef(null);
    
      useEffect(() => {
        dispatch(clearProducts()); // <-- Clear products on section change
        setPage(0); // Reset pagination
      }, [selectedSection, searchQuery, dispatch]);
    
      useEffect(() => {
        const delayDebounce = setTimeout(() => {
          if (searchQuery.trim()) {
            dispatch(searchedProducts({ section: selectedSection, searchQuery }));
          } else {
            dispatch(getProducts({ page, section: selectedSection }));
          }
        }, 300);
      
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
    
      const [isShowProduct, setIsShowProduct] = useState(false);
      const [showProduct, setShowProduct] = useState(null);
    
      const [isEditing, setIsEditing] = useState(false);
      const [editingProduct, setEditingProduct] = useState(null);
    
      const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
      };
    
      const handleShowProduct = (product) => {
        setIsShowProduct(true);
        setShowProduct(product);
      };
    
      const handleProductDetailClose = () => {
        setIsShowProduct(false);
        setEditingProduct(null);
      };
    
      const handleFormClose = () => {
        setIsEditing(false);
        setEditingProduct(null);
      };
    
    
      // useEffect(() => {
      //   dispatch(getProducts(selectedSection));
      // }, [dispatch, selectedSection]);
    
      const handleDelete = async (Id) => {
        if (!selectedSection) {
          alert("Erro: No section Selected");
          return;
        }
        if (!Id) {
          alert("Erro: Invalid Product Id");
          return;
        }
    
        if (window.confirm("are you sure to delete")) {
          try {
            console.log(
              `Deleting product from ${selectedSection}, ID: ${Id}`
            );
            dispatch(deleteWorkout({ Id }));
            dispatch(getProducts(selectedSection));
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
            Gym Workout
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
                  Muscle Targeted
                </th>
                
                <th className="font-medium border border-gray-300 p-2">Duration</th>
                <th className="font-medium border border-gray-300 p-2">
                  Repetation
                </th>
                <th className="font-medium border border-gray-300 p-2">
                  Difficulty Level
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
                      {item.muscles_targeted}
                    </td>
                    
                    <td className="border border-gray-300 p-2 text-center">
                      {item.duration}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.repetition}
                    </td>
                    <td className="border border-gray-300 p-2 text-center ">
                      {item.difficulty_level === "high" && (<p className="bg-red-600 w-20 text-center rounded-full text-white capitalize  flex items-center justify-center" ><MdOutlineSignalWifiStatusbar4Bar />{item.difficulty_level}</p>)}
                      {item.difficulty_level === "low" && (<p className="bg-green-400 w-20 text-center rounded-full text-white capitalize flex items-center justify-center" ><MdOutlineNetworkWifi1Bar />{item.difficulty_level}</p>)}
                      {item.difficulty_level === "medium" && (<p className="bg-orange-600 w-20 text-center rounded-full text-white capitalize flex items-center justify-center" > <MdOutlineNetworkWifi3Bar />{item.difficulty_level}</p>)}
                    </td>
                    
                    <td className="border border-gray-300 p-2 text-center min-w-[100px] h-full">
                      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
                        <button
                          type="button"
                          onClick={() => handleShowProduct(item)}
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
                              console.error("ID is missing:", item);
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
            <AddWorkout
              workout={editingProduct}
              onClose={handleFormClose} // Pass a function to close the form
            />
          </div>
        </>
      )}

      {isShowProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setIsShowProduct(false)}
          ></div>
          <div className="absolute z-1000">
            <ViewWorkoutProduct
              workout={showProduct}
              onClose={handleProductDetailClose}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default GymWorkoutTable