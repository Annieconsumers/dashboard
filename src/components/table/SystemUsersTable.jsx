
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getSystemUser } from "../../redux/slices/systemUserSlice";
import { useEffect } from "react";

const SystemUsersTable = () => {

 const {systemUser} = useSelector((state)=> state.systemUser)
 console.log(systemUser);
 const dispatch = useDispatch()
 
 useEffect(() => {
   dispatch(getSystemUser())
 }, [dispatch])
 
  
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
      width: "100px",
    },
    {
      name: "User Id",
      selector: (row) => row.user_id,
      width: "350px",
    },
    {
      name: "Profile Pic",
      selector: (row) => row.profile_pic,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      width: "150px",
    },
  ];

  

  
  const data = systemUser.map((item, index) => ({
    serialNo: index + 1,
    user_id: item.person_id,
    user_name: item.name ,
    profile_pic: <img src = {item.profile_pic_url} alt="profile" className="h-15 w-15" />,
   type:  item.person_type.split("_").map(word =>                       // Capitalize each word
    word.charAt(0).toUpperCase() + word.slice(1)
  )
  .join(" "),
   contact: item.contact 
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
    <div className="h-screen overflow-y-hidden">
      <div className=" m-5 p-2 text-5xl font-semibold bg-white sticky top-0 z-10 ">
        <h1>System Users</h1>
      </div>
      <div className="max-h-[75vh] max-w-[81vw]">
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          fixedHeaderScrollHeight="78vh"
          pagination
          defaultSortFieldId={1}
        />
      </div>
     
    </div>
  );
};

export default SystemUsersTable;
