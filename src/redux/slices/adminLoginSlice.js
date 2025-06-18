import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdminDetailsAPI, loginAdminApi } from "../api/adminLoginApi";
//import { LoginSellerApi } from "../Api/sellerDetailsApi";

export const loginAdmin=createAsyncThunk("admin/login",async(phone)=>{
    console.log("phone",phone);
    const seller= await loginAdminApi(phone)
    return seller;
})

export const getAdminDetails=createAsyncThunk("admin-details/fetch",async(adminDetails)=>{
    const sellerDetail= await fetchAdminDetailsAPI(adminDetails)
    return sellerDetail;
})

const loginAdminSlice = createSlice({
    name:"admins",
    initialState:{
        admins:[],
        adminDetails:JSON.parse(localStorage.getItem("admin")),
        adminProfileData:[],
        loading:false,
        error:null
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder
       .addCase(loginAdmin.pending,(state)=>{
        state.loading=true,
        state.error=null
       })
       .addCase(loginAdmin.fulfilled,(state,action)=>{
        state.admins=action.payload;
       })
       .addCase(loginAdmin.rejected,(state,action)=>{
        state.error=action.payload;
       })
       .addCase(getAdminDetails.pending,(state)=>{
        state.loading=true,
        state.error=null
       })
       .addCase(getAdminDetails.fulfilled,(state,action)=>{
        state.adminProfileData=action.payload;
       })
       .addCase(getAdminDetails.rejected,(state,action)=>{
        state.error=action.payload;
       })
    }
})
export default loginAdminSlice.reducer;