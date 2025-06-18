import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deliveryBoyRegisterApi, deliveryBoyUpdateApi, fetchActiveVerifiedDeliveryBoyApi, fetchInactiveVerifiedDeliveryBoyApi, fetchNotVerifiedDeliveryBoysApi, fetchVerifiedDeliveryBoyApi,  } from "../api/deliveryBoyApi";


export const getdeliveryBoyData = createAsyncThunk(
    'deliveryBoyData/fetch',
    async () => {
      const deliveryBoyDetails = await fetchDeliveryBoyData();
      console.log(deliveryBoyDetails);
      return deliveryBoyDetails;
    }
  );
  
  // Async thunk to register a new delivery boy
  export const deliveryBoyRegister = createAsyncThunk(
    "deliveryBoy/register",
    async ({ formData, seller_id }) => {
      const deliveryBoys = await deliveryBoyRegisterApi({ formData, seller_id });
      return deliveryBoys;
    }
  );

  export const getVerifiedDeliveryBoys = createAsyncThunk("verified/deliverBoys", async()=>{
    const deliverBoys = await fetchVerifiedDeliveryBoyApi()
    return deliverBoys
  })

  export const getActiveVerifiedDeliveryBoys = createAsyncThunk("ActiveVerified/deliverBoys", async()=>{
    const deliverBoys = await fetchActiveVerifiedDeliveryBoyApi()
    return deliverBoys
  })

  export const getInactiveVerifiedDeliveryBoys = createAsyncThunk("InactiveVerified/deliverBoys", async()=>{
    const deliverBoys = await fetchInactiveVerifiedDeliveryBoyApi()
    return deliverBoys
  })

  export const getNotVerifiedDeliveryBoys = createAsyncThunk("Notverified/deliverBoys", async()=>{
    const deliverBoys = await fetchNotVerifiedDeliveryBoysApi()
    return deliverBoys
  })

  export const updateDeliveryBoy = createAsyncThunk("update/deliveryBoy", async(formData) =>{
    console.log(formData);
    const deliverBoys = await deliveryBoyUpdateApi(formData)
    return deliverBoys
  })
  
  // Slice 
  const deliveryBoySlice = createSlice({
    name: "deliveryBoys",
    initialState: {
      deliveryBoys: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(deliveryBoyRegister.pending, (state) => {
          state.loading = true;
        })
        .addCase(deliveryBoyRegister.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys.push(action.payload);
        })
        .addCase(deliveryBoyRegister.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getdeliveryBoyData.pending, (state) => {
          state.loading = true;
        })
        .addCase(getdeliveryBoyData.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys = action.payload;
        })
        .addCase(getdeliveryBoyData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getVerifiedDeliveryBoys.pending, (state) => {
          state.loading = true;
        })
        .addCase(getVerifiedDeliveryBoys.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys = action.payload;
        })
        .addCase(getVerifiedDeliveryBoys.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getActiveVerifiedDeliveryBoys.pending, (state) => {
          state.loading = true;
        })
        .addCase(getActiveVerifiedDeliveryBoys.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys = action.payload;
        })
        .addCase(getActiveVerifiedDeliveryBoys.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getInactiveVerifiedDeliveryBoys.pending, (state) => {
          state.loading = true;
        })
        .addCase(getInactiveVerifiedDeliveryBoys.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys = action.payload;
        })
        .addCase(getInactiveVerifiedDeliveryBoys.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(getNotVerifiedDeliveryBoys.pending, (state) => {
          state.loading = true;
        })
        .addCase(getNotVerifiedDeliveryBoys.fulfilled, (state, action) => {
          state.loading = false;
          state.deliveryBoys = action.payload;
        })
        .addCase(getNotVerifiedDeliveryBoys.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
        .addCase(updateDeliveryBoy.pending, (state)=>{
          state.loading= true
        })
         .addCase(updateDeliveryBoy.fulfilled, (state, action)=>{
          state.loading= false
          state.deliveryBoys = action.payload
        })
    },
  });
  
  export default deliveryBoySlice.reducer;
  