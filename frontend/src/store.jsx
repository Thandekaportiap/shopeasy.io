import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Features/UsersSlice";
import registerReducer from './Features/Register/RegisterSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
  },
});

export default store; // Ensure this is the default export
