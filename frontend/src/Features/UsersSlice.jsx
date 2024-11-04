import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null, // or set a default value
    // Add other user-related state here if needed
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;