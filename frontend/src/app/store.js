import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import goalReducer from '../redux/goals/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
  },
});
