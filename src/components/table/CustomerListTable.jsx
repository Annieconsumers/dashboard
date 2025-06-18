import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import ViewUserDetails from "../preview/ViewUserDetails";
import UpdateUserForm from "../form/update/UpdateUserForm";


const CustomerListTable = () => {
  const { users } = useSelector((state) => state.user);
  console.log(users);

  const [isShowUser, setIsShowUser] = useState(false)
  const [showUser, setShowUser] = useState(null)


  const handleShowUser = (user) =>{
    // console.log(user);
    setIsShowUser(true)
    setShowUser(user)
  }

  const handleCloseUser = () =>{
    setIsShowUser(false)
    setShowUser(null)
  }

  const [isUpdateUser, setIsUpdateUser] = useState(false)


  const handleShowUpdateForm = (user) =>{
    setIsUpdateUser(true)
    setShowUser(user)
  }

  const handleCloseUpdateForm = () =>{
    setIsUpdateUser(false)
   setShowUser(null)
  }

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
      width: "100px",
    },
    {
      name: "Id",
      selector: (row) => row.user_id,
      width: "100px",
    },
    {
      name: "Profile",
      selector: (row) => row.profile_pic_url,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      minWidth: "250px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      minwidth: "100px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      minWidth: "300px",
    },
    {
      name: "Mobile",
      selector: (row) => row.phone_number,
      minWidth: "150px",
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      minWidth: "200px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      width: "400px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "180px",
      center:true
    },
  ];

  const data =  (users || []).map((item, index) => ({
    serialNo: index + 1,
    user_id: item.user_id.slice(0, 8),
    profile_pic_url: (
      <img
        src={item.profile_pic_url}
        alt="profile_pic"
        className="h-15 w-15 object-cover p-1"
      />
    ),
    name: item.name,
    role: item.role,
    email: item.email,
    phone_number: item.phone_number,
    created_at: moment(item.created_at).format("lll"),
    address: (
      <div className="text-[15px]">
        {item.address_line} {item.city} {item.state} {item.postal_code}{" "}
      </div>
    ),
    action: (
          <div className="inline-flex items-center text-white justify-center gap-1 w-full">
            <button
              type="button"
              onClick={() => handleShowUser(item)}
              className="bg-green-600 cursor-pointer text-3xl rounded-md p-1"
            >
              <IoEyeOutline />
            </button>
            <button
              type="button"
              onClick={() => handleShowUpdateForm(item)}
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
  })) 

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
    <div className="max-h-screen  " >
      <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10  ">
        <h1>Customer List</h1>
      </div>
      <div >
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          fixedHeaderScrollHeight="79vh"
          pagination
          defaultSortFieldId={1}
        />
      </div>
      {
        isShowUser && (
          <>
            <div className="bg-black/75 fixed inset-0 z-20" onClick={()=>setIsShowUser(false)}></div>
            <div className="absolute z-50">
              <ViewUserDetails user= {showUser} onClose={handleCloseUser} />
            </div>
          </>
        )
      }

      {
        isUpdateUser && (
          <>
            <div className="fixed inset-0 z-20 bg-black/75"></div>
            <div className='absolute z-50'>
              <UpdateUserForm user={showUser} onClose = {handleCloseUpdateForm} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default CustomerListTable;
