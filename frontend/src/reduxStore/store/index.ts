import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'reduxStore/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
