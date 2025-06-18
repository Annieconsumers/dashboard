import { useDispatch, useSelector } from "react-redux"
import { getSubscribedUser } from "../../redux/slices/subscriptionsSlice";
import DataTable from 'react-data-table-component'
import { useEffect } from "react";


const MembershipUserTable = () => {

  const {subscribedUser} = useSelector((state)=> state.subscription)
  console.log(subscribedUser);
   const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubscribedUser())
  }, [dispatch])
  
  
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
    },
    {
      name: "ID",
      selector: (row) => row.user_id,
    },
    {
      name: "User",
      selector: (row) => row.user,
      
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      
    },
    {
      name: "Remaining",
      selector: (row) => row.remaining,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      center: true
    },
  ];

  const data = subscribedUser.map((item, index) => ({
    serialNo: index + 1,
    user_id: item.users.user_id,
    user: <div className="flex items-center gap-2 font-semibold"> <img src={item.users.profile_pic_url} alt={item.users.name} className="h-10 w-10 object-fill rounded-full" /> <p>{item.users.name}</p></div>,
    contact: item.users.phone_number,
    remaining: item.remaining_count,
    status: ( item.status === "cancelled" 
      ?
      <p className="bg-red-600 px-5 py-2 font-semibold text-white rounded-full text-center">{item.status}</p> 
      :
      <p className="bg-green-600 px-5 py-2 font-semibold text-white rounded-full text-center">{item.status}</p>
  )

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
        fontSize: '15px'
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
          justifyContent: "center",
          fontSize: '15px'
        },
      },
    },
    tableWapper:{
      style:{
        borderBottom: "1px solid gray",
      }
    }
  };

    
  return (
    <div style={{ width: `calc(100% - 0px)` }}>
    <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
      <h1>Manage Subscription</h1>
    </div>
    <div className="max-h-[75vh] max-w-[81vw] "> 
      <DataTable
        fixedHeader
        columns={columns}
        data={data}
        customStyles={customStyles}
        fixedHeaderScrollHeight="67vh"
        pagination
        defaultSortFieldId={1}
      />
    </div>
  </div>
  )
}

export default MembershipUserTable