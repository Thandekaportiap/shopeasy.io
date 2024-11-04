import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../components/Firebase';

export const registerAdmin = createAsyncThunk(
    'user/registerAdmin',
    async ({ username, email, password, firstName, lastName, mobile, profilePicture, company }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User created:", user.uid); 

            const userData = {
                username,
                email,
                firstName,
                lastName,
                mobile,
                profilePicture: profilePicture ? profilePicture.name : null, 
                company, 
            };

            await setDoc(doc(db, 'usersAdmin', user.uid), userData);

            console.log("User data saved to Firestore"); 

            return { uid: user.uid, email: user.email, username };
        } catch (error) {
            console.error("Firestore error:", error); 
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;