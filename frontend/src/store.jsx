import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Features/UsersSlice";
import registerReducer from './Features/Register/RegisterSlice';
import productsReducer from './Features/Product/ProductSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    products: productsReducer
  },
});

export default store; 
