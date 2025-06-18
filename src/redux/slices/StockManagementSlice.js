import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStockApi } from "../api/stockManagementApi";


export const getStock=createAsyncThunk('stock/fetch',async()=>{
    const stocks = await fetchStockApi();
    return stocks;
})

const stockSlice = createSlice({
    name:"stocks",
    initialState:{
        stocks:[],
        loading:false,
        error:null
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder
       .addCase(getStock.pending,(state)=>{
        state.loading=true,
        state.error=null
       })
       .addCase(getStock.fulfilled,(state,action)=>{
        state.stocks=action.payload;
       })
       .addCase(getStock.rejected,(state,action)=>{
        state.error=action.payload;
       })
    }
})
export default stockSlice.reducer;