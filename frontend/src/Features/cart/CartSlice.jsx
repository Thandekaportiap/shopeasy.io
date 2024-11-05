import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, fetchCart, updateCartItem, removeItem } from '../../components/CartServiceFuntion';

// Thunk to fetch the user's cart
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (customerId) => {
    const items = await fetchCart(customerId);
    console.log("Fetched cart items:", items); // This should log your cart items
    return items;
});


// Thunk to add an item to the cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ customerId, item }) => {
    await addToCart(customerId, item);
    return item; // Returning the added item
});

// Thunk to update the quantity of an item in the cart
export const updateItemQuantity = createAsyncThunk('cart/updateItemQuantity', async ({ customerId, itemId, quantity }) => {
    await updateCartItem(customerId, itemId, quantity);
    return { itemId, quantity }; // Return item ID and new quantity
});

// Thunk to remove an item from the cart
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({ customerId, itemId }) => {
    await removeItem(customerId, itemId); // Pass the itemId to remove it
    return itemId; // Return itemId for easier state management
});

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // You can define any additional synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.items = action.payload; // Set fetched items
                state.status = 'succeeded';
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Store the error message
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                // Optionally merge the new item into the existing items
                const existingItem = state.items.find(item => item.id === action.payload.id);
                if (existingItem) {
                    // If the item already exists, increase the quantity
                    existingItem.quantity += 1;
                } else {
                    // Otherwise, add the new item with quantity 1
                    state.items.push({ ...action.payload, quantity: 1 });
                }
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                const { itemId, quantity } = action.payload;
                const existingItem = state.items.find(item => item.id === itemId);
                if (existingItem) {
                    existingItem.quantity = quantity; // Update the quantity
                }
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                const itemId = action.payload;
                state.items = state.items.filter(item => item.id !== itemId); // Remove the item
            });
    },
});

// Export the reducer to be used in the store
export default cartSlice.reducer;
