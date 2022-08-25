import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products-slice";
import authSlice from "./auth-slice";
import cardSlice from "./card-slice";
import orderSlice from "./order-slice";
import userSlice from "./user-slice";
import uiSlice from "./ui-slice";
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    card: cardSlice.reducer,
    orders: orderSlice.reducer,
    users: userSlice.reducer,
    ui: uiSlice.reducer,
  },
});
export default store;
