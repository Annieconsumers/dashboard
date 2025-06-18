import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  fetchSellerApi, fetchSellerSectionWiseApi, fetchSingleSellerapi, sellerRegisterApi, sellerUpdateApi } from "../api/sellerApi";


export const getSeller = createAsyncThunk("seller/order/fetch", async () => {
        const sellers = await fetchSellerApi();
        console.log(sellers);
        return sellers;
});

export const sellerRegister = createAsyncThunk("seller/register", async({storeInfo, sellerInfo, bankInfo})=>{
    const sellers = await sellerRegisterApi({storeInfo, sellerInfo, bankInfo});
    // console.log(storeInfo);
    // console.log(sellerInfo);
    // console.log(bankInfo);
 
    return sellers
})

export const sellerUpdate = createAsyncThunk("seller/update", async(updateData)=>{
    // console.log(updateData);
    const seller = await sellerUpdateApi(updateData)
    return seller;
})

export const getSellerSectionWise = createAsyncThunk("seller/sectionWise/fetch", async(section)=>{
    const sellers = await fetchSellerSectionWiseApi(section);
    console.log(sellers);
    return sellers;
})

export const getSingleSeller = createAsyncThunk("singleSeller/fetch", async(seller_id)=>{
    const sellers = await fetchSingleSellerapi(seller_id);
    console.log(sellers);
    return sellers;
})



const orderSlice = createSlice({
    name: "sellers",
    initialState: {
        sellers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.sellers = action.payload;
            })
            .addCase(getSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch seller.";
            })
            .addCase(getSellerSectionWise.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSellerSectionWise.fulfilled, (state, action) => {
                state.loading = false;
                state.sellers = action.payload;
            })
            .addCase(getSellerSectionWise.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch seller.";
            })
            .addCase(sellerRegister.pending, (state)=>{
                state.loading = true
            })
            .addCase(sellerRegister.fulfilled, (state, action)=>{
                state.loading = false,
                state.sellers.push(action.payload)
            })
            .addCase(sellerRegister.rejected, (state, action) =>{
                state.loading = false,
                state.sellers = action.payload
            })
            .addCase(sellerUpdate.pending, (state)=>{
                state.loading = true
            })
            .addCase(sellerUpdate.fulfilled, (state, action)=>{
                state.loading = false,
                state.sellers = action.payload
            })
            .addCase(sellerUpdate.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload
            })
            .addCase(getSingleSeller.pending, (state)=>{
                state.loading = true
            })
            .addCase(getSingleSeller.fulfilled, (state, action)=>{
                state.loading = false,
                state.sellers = action.payload
            })
            .addCase(getSingleSeller.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload
            })
    },
});

export default orderSlice.reducer;
