import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../Firebase';

// Async thunk to fetch user cart
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (customerId) => {
    const cartDoc = await firestore.collection('carts').doc(customerId).get();
    return cartDoc.exists ? { items: cartDoc.data().products || [] } : { items: [] };
});

// Slice definition
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addItemToCart(state, action) {
            const { customerId, item } = action.payload;
            const existingItem = state.items.find(i => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push({ ...item, quantity: item.quantity });
            }
            const cartRef = firestore.collection('carts').doc(customerId);
            cartRef.set({ products: state.items }, { merge: true });
        },
        updateItemQuantity(state, action) {
            const { customerId, itemId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.productId === itemId);
            if (existingItem) {
                existingItem.quantity = quantity;
                const cartRef = firestore.collection('carts').doc(customerId);
                cartRef.set({ products: state.items }, { merge: true });
            }
        },
        removeItemFromCart(state, action) {
            const { customerId, itemId } = action.payload;
            const updatedItems = state.items.filter(item => item.productId !== itemId);
            const cartRef = firestore.collection('carts').doc(customerId);
            cartRef.set({ products: updatedItems }, { merge: true });
            return { ...state, items: updatedItems };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addItemToCart, updateItemQuantity, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
