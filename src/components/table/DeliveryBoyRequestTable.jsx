import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotVerifiedDeliveryBoys } from "../../redux/slices/deliveryBoySlice";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import ViewDeliveryBoyRequests from "../preview/ViewDeliveryBoyRequests";
import { acceptDeliveryBoyApi, rejectDeliveryBoyApi } from "../../redux/api/deliveryBoyApi";

const DeliveryBoyRequestTable = () => {
  const { deliveryBoys } = useSelector((state) => state.deliveryBoy);
  const dispatch = useDispatch();
  console.log(deliveryBoys);

  useEffect(() => {
    dispatch(getNotVerifiedDeliveryBoys());
  }, [dispatch]);

  const [isShowDeliveryBoy, setIsShowDeliveryBoy] = useState(false);
  const [deliveryBoy, setDeliveryBoy] = useState(null);

  const handleShowDeliveryBoy = (item) => {
    setIsShowDeliveryBoy(true);
    setDeliveryBoy(item);
  };

  const handleOnClose = () => {
    setIsShowDeliveryBoy(false);
    setDeliveryBoy(null);
  };

  const handleSubmitAccept = async(id) => {
    console.log(id);
    await acceptDeliveryBoyApi(id)
    dispatch(getNotVerifiedDeliveryBoys())
  };

  const handleSubmitReject = async(id) => {
    console.log(id);
    await rejectDeliveryBoyApi(id)
    dispatch(getNotVerifiedDeliveryBoys())
  };

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
      name: "contact No",
      selector: (row) => row.phone_number,
      width: "150px",
    },
    {
      name: "Store Address",
      selector: (row) => row.store_address,
    },
    {
      name: "Preview",
      selector: (row) => row.preview,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      center: "true",
    },
  ];

  const data = deliveryBoys?.map((item, index) => ({
    serialNo: index + 1,
    profile_pic: (
      <img src={item.profile_image_url} alt="" className="h-15 w-15" />
    ),
    seller_id: item.id.slice(0, 8),
    user_name: item.full_name,
    store_name: item.store_name,
    phone_number: item.phone_number,
    store_address: <div>{item.address}</div>,
    preview: (
      <button
        onClick={() => handleShowDeliveryBoy(item)}
        className="text-3xl cursor-pointer"
      >
        <FaEye />
      </button>
    ),
    action: (
      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
        <button
          type="button"
          onClick={() => handleSubmitAccept(item.id)}
          className="bg-green-600 cursor-pointer text-lg rounded-md px-3 hover:bg-green-700"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleSubmitReject(item.id)}
          className="bg-red-500 cursor-pointer text-lg rounded-md px-3 hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    ),
    segment: item.section,
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
      <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10 ">
        <h1>Delivery Boy Requests</h1>
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
      {isShowDeliveryBoy && (
        <>
          <div
            className="fixed inset-0 bg-black/75 z-20 "
            onClick={() => setIsShowDeliveryBoy(false)}
          ></div>
          <ViewDeliveryBoyRequests
            deliveryBoy={deliveryBoy}
            onClose={() => handleOnClose()}
          />
        </>
      )}
    </div>
  );
};

export default DeliveryBoyRequestTable;
