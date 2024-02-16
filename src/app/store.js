import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});
