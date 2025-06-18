import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { feedbackUserApi, fetchUserApi, updateUserApi } from "../api/users"


export const getUsers = createAsyncThunk("get/users", async() =>{
    const response = await fetchUserApi()
    return response
})

export const feedbackUser = createAsyncThunk("get/user-feedbakc", async() =>{
    const response = await feedbackUserApi()
    return response
})

export const updateUser = createAsyncThunk("update/user", async({id, data}) =>{
    console.log(id);
    console.log(data);
    
    const response = await updateUserApi(id, data)
    return response 
})


const userSlice = createSlice({
    name: "users",
    initialState : {
        users: [],
        loading: false,
        error: null
    },
    reducers:{

    },
    extraReducers : (builder) =>{
        builder
        .addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action)=>{
            state.loading = false,
            state.users = action.payload;
        })
        .addCase(feedbackUser.pending, (state)=>{
            state.loading = true;
        })
        .addCase(feedbackUser.fulfilled, (state, action) =>{
            state.loading = false,
            state.users = action.payload;
        })
        .addCase(updateUser.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) =>{
            state.loading = false,
            state.users = action.payload;
        })
    }
})

export default userSlice.reducer;