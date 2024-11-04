import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../components/Firebase'

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ username, email, password, firstName, lastName, mobile, profilePicture }, { rejectWithValue }) => {
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
            profilePicture: profilePicture ? profilePicture.name : null 
        };

        await setDoc(doc(db, 'users', user.uid), userData);
  
        return { uid: user.uid, email: user.email, username };
      } catch (error) {
        console.error("Firestore error:", error);
        return rejectWithValue(error.message);
      }
    }
  )

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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;