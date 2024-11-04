import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    }
);

// Thunk to fetch products by adminId
export const fetchProductsByAdminId = createAsyncThunk(
    'products/fetchByAdminId',
    async (adminId) => {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where("adminId", "==", adminId));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByAdminId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByAdminId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProductsByAdminId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;
