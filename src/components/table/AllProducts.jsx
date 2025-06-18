import React, {  useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProducts,
  deleteProduct,
  getProducts,
  searchedProducts,
} from "../../redux/slices/productSlice";
import { IoEyeOutline } from "react-icons/io5";
import AddProductForm from "../form/AddProductForm";
import ViewAllDetails from "../preview/ViewAllDetails";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { products, hasMore, loading } = useSelector((state) => state.product);
  const selectedSection = useSelector(
    (state) => state.category.selectedSection
  );
  console.log(products.length);

  const [page, setPage] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(clearProducts()); // <-- Clear products on section change
    setPage(0); // Reset pagination
  }, [selectedSection, searchQuery, dispatch]);

  console.log(page);
  

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchedProducts({page, section: selectedSection, searchQuery }));
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
          `Deleting product from ${selectedSection}, ID: ${productId}`
        );
        dispatch(deleteProduct({ section: selectedSection, productId }));
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
            {selectedSection
              ? `${
                  selectedSection.charAt(0).toUpperCase() +
                  selectedSection.slice(1)
                } Management`
              : "Product Management"}
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
                  HSN Code
                </th>
                <th className="font-medium border border-gray-300 p-2">
                  Category
                </th>
                {selectedSection === "mart" && (
                  <th className="font-medium border border-gray-300 p-2">
                    Quantity
                  </th>
                )}
                <th className="font-medium border border-gray-300 p-2">MRP</th>
                <th className="font-medium border border-gray-300 p-2">
                  Discount (%)
                </th>
                <th className="font-medium border border-gray-300 p-2">
                  Retail Price (₹)
                </th>
                <th className="font-medium border border-gray-300 p-2">
                  Status
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
                      {item.hsn_code}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.categories?.name}
                    </td>
                    {selectedSection === "mart" && (
                      <td className="border border-gray-300 p-2 text-center">
                        {item.stock_quantity}
                      </td>
                    )}
                    <td className="border border-gray-300 p-2 text-center">
                      <span className="font-semibold">₹</span> {item.price}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.discount_percentage}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <span className="font-semibold">₹</span>{" "}
                      {item.discounted_price}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <div className="text-white  font-semibold p-1 m-auto">
                        {item.stock_quantity === 0 ? (
                          <p className="bg-red-600 p-2 rounded-lg ">
                            Not Available
                          </p>
                        ) : (
                          <p className="bg-green-700 p-2 rounded-lg ">
                            Available
                          </p>
                        )}
                      </div>
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
            <AddProductForm
              product={editingProduct}
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
            <ViewAllDetails
              product={showProduct}
              onClose={handleProductDetailClose}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
