import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller } from "../../redux/slices/sellerSlice";
import DataTable from "react-data-table-component";
import mapIcon from "../../assets/customSvg/map-icon.svg";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import ViewSellerDetails from "../preview/ViewSellerDetails";
import UpdateSellerForm from "../form/update/UpdateSellerForm";


const ManageSellerTable = () => {
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  // console.log(sellers);

  useEffect(() => {
    dispatch(getSeller());
  }, [dispatch]);

  const [isShowSeller, setIsShowSeller] = useState(false);
  const [showSeller, setShowSeller] = useState(null);

  
  const handleShowSellerInfo = (seller) => {
    console.log(seller);
    setIsShowSeller(true);
    setShowSeller(seller);
  };
  
  const handleSellerDetailsClose = () =>{
    setIsShowSeller(false)
    setShowSeller(null)
  }
  
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateSeller, setUpdateSeller] = useState(null)

  const handleShowUpdateSeller = (seller) =>{
    setIsUpdate(true)
    setUpdateSeller(seller)
  }

  const handleCloseUpdate = () =>{
    setIsUpdate(false)
    setUpdateSeller(null)
  }

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
      width: "100px",
    },
    {
      name: "Segment",
      selector: (row) => row.segment,
      width: "100px",
    },
    {
      name: "Profile Pic",
      selector: (row) => row.profile_pic,
      width: "150px",
    },
    {
      name: "Seller id",
      selector: (row) => row.seller_id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
    },
    {
      name: "Store Name",
      selector: (row) => row.store_name,
      width: "150px",
    },
    {
      name: "contact No",
      selector: (row) => row.phone_number,
      width: "150px",
    },
    {
      name: "Store Address",
      selector: (row) => row.store_address,
    },
    {
      name: "Store Location",
      selector: (row) => row.store_location,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      centre: true
    },
  ];

  const data = sellers?.map((item, index) => ({
    serialNo: index + 1,
    profile_pic: <img src={item.profile_urls} alt="" className="h-15 w-15" />,
    seller_id: item.id,
    user_name: item.seller_name,
    store_name: item.store_name,
    phone_number: item.seller_contact,
    store_address: (
      <div>
        {item.address_line_1} {item.store_city} {item.store_state}{" "}
        {item.store_postal_code}{" "}
      </div>
    ),
    store_location: (
      <a target="blank" href={item.store_address_url}>
        <img src={mapIcon} alt="Map Icon" className="h-6 w-6" />
      </a>
    ),
    action: (
      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
        <button
          type="button"
          onClick={() => handleShowSellerInfo(item)}
          className="bg-green-600 cursor-pointer text-3xl rounded-md p-1"
        >
          <IoEyeOutline />
        </button>
        <button
          type="button"
          onClick={() => handleShowUpdateSeller(item)}
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
    ),
    segment: item.segment,
  }));

  const customStyles = {
    headCells: {
      style: {
        borderBottom: "1px solid black", // Bottom border for header cells
        borderRight: "1px solid gray", // Right border for header cells
        backgroundColor: "#f4f4f4", // Light gray background
        fontWeight: "bold",
        borderTop: "1px solid black",
        justifyContent: "center",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
          justifyContent: "center",
          fontSize: "15px",
        },
      },
    },
  };


  return (
    <div>
      <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
        <h1>Manage Seller</h1>
      </div>
      <div className="max-h-[75vh] max-w-[81vw]">
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          // fixedHeaderScrollHeight="67vh"
          pagination
          defaultSortFieldId={1}
        />
      </div>
      {
        isShowSeller && (
          <>
            <div className="fixed inset-0 bg-black/70 z-50" onClick={()=> setIsShowSeller(false)}></div>
            <div className="absolute z-50">
              <ViewSellerDetails seller={showSeller} onClose={handleSellerDetailsClose} />
            </div>
          </>
        )
      }
      {
        isUpdate && (
          <>
            <div className="fixed inset-0 bg-black/70 z-50" onClick={()=> setIsShowSeller(false)}></div>
            <div className="absolute z-50">
              <UpdateSellerForm seller={updateSeller} onClose={handleCloseUpdate} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default ManageSellerTable;
