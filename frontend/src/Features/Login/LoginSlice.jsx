// src/features/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isAuthenticated: false, // Corrected the typo here
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Updated to match the corrected property name
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false; // Updated to match the corrected property name
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;