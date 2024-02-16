import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null
  },
  reducers: {
    select: (state, action) => {
      state.profile = action.payload;
    },
    unSelect: (state) => {
      state.profile = null;
    },
  }
});

export const { select, unSelect } = profileSlice.actions;

export const selectProfile = (state) => state.profile.profile;

export default profileSlice.reducer;