import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Features/UsersSlice";
import registerReducer from './Features/Register/RegisterSlice';
import productsReducer from './Features/Product/ProductSlice'
import cartReducer from './Features/cart/CartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store; 
