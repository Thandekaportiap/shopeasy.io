import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, fetchCart, updateCartItem, removeItem } from '../../components/CartServiceFuntion';

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (customerId) => {
    const items = await fetchCart(customerId);
    console.log("Fetched cart items:", items); // Add this line
    return items;
  });
  

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ customerId, item }) => {
  await addToCart(customerId, item);
  return item;
});

export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ customerId, itemId, quantity }) => {
  await updateCartItem(customerId, itemId, quantity);
  return { itemId, quantity };
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({ customerId, item }) => {
  await removeItem(customerId, item);
  return item;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message
      });
  },
  
});

export default cartSlice.reducer;
