import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSubcribedUser } from "../api/subscriptions";


export const getSubscribedUser = createAsyncThunk("subscribed/fetch", async() =>{
    const subscribedUser = await fetchSubcribedUser()
    return subscribedUser
})

const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState: {
        subscribedUser: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getSubscribedUser.pending, (state) =>{
            state.loading = true
        })
        .addCase(getSubscribedUser.fulfilled, (state, action) =>{
            state.subscribedUser = action.payload
        })
        .addCase(getSubscribedUser.rejected, (state, action) =>{
            state.error = action.payload
        })
    }
})

export default subscriptionSlice.reducer