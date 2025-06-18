import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/usersSlice"
import orderReducer from "./slices/orderSlice"
import sellerReducer from "./slices/sellerSlice"
import stockReducer from "./slices/StockManagementSlice"
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionsSlice";
import deliveryBoyReducer from "./slices/deliveryBoySlice"
import employeeReducer from "./slices/employeeSlice"
import systemUserReducer from "./slices/systemUserSlice";
import workoutReducer from "./slices/workoutSlice"
import nutritionReducer from "./slices/nutritionSlice"
import gymProductReducer from "./slices/gymProductSlice"
import adminReducer from "./slices/adminLoginSlice"


const store = configureStore({
    reducer :{
        admin: adminReducer,
        category: categoryReducer,
        product: productReducer,
        user: userReducer,
        order: orderReducer,
        seller: sellerReducer,
        stock: stockReducer,
        auth: authReducer,
        subscription: subscriptionReducer,
        deliveryBoy: deliveryBoyReducer,
        employee: employeeReducer,
        systemUser: systemUserReducer,
        workout: workoutReducer,
        nutrition: nutritionReducer,
        gymProduct: gymProductReducer
    }
})

export default store;