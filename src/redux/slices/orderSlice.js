import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMartOrderApi, fetchRestaurantOrderApi, fetchSalonOrderApi } from "../api/orderApi";


export const getMartOrders = createAsyncThunk("order/fetchMartOrder", async () => {
        const orders = await fetchMartOrderApi();
        // console.log(orders);
        return orders;
});

export const getRestaurantOrders = createAsyncThunk("order/fetchRestaurantOrder", async () => {
    const orders = await fetchRestaurantOrderApi();
    // console.log(orders);
    return orders;
});

export const getSalonOrders = createAsyncThunk("order/fetchSalonOrder", async() =>{
    const orders = await fetchSalonOrderApi()
    return orders
})

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        martOrders: [],
        restaurantOrders: [],
        salonOrders: [],
        loading: false,
        error: null,
      },
      
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMartOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMartOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.martOrders = action.payload;
            })
            .addCase(getMartOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders.";
            })
            .addCase(getRestaurantOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurantOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurantOrders = action.payload;
            })
            .addCase(getRestaurantOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders.";
            })
            .addCase(getSalonOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSalonOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.salonOrders = action.payload;
            })
            .addCase(getSalonOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders.";
            });
    },
});

export default orderSlice.reducer;
