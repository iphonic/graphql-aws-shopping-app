import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signOut: state => {
      state.user = null;
      state.token = '';
    },
  },
});

export const {setUser, signOut} = authSlice.actions;
export default authSlice.reducer;
