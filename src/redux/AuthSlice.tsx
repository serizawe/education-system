import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    role: string | null;
    userId: string | null;
    isLoading: boolean;
    error: string | null;
}

interface Credentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    role: string;
    userId: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: Credentials, { dispatch }): Promise<LoginResponse> => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('https://localhost:7250/api/auth/login', credentials);
            const { token, userId, role } = response.data;
            console.log(response.data);
            dispatch(loginSuccess({ token, role, userId }));
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);
            return { token, role, userId };
        } catch (error) {
            dispatch(loginFailure({ error: (error as Error).message }));
            throw error; // Re-throw the error for further handling if needed
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        userId: localStorage.getItem('userId'),
        isLoading: false,
        error: null,
    } as AuthState,
    reducers: {
        loginRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<LoginResponse>) {
            state.isLoading = false;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
            state.error = null;
            localStorage.setItem('role', action.payload.role);
        },
        loginFailure(state, action: PayloadAction<{ error: string }>) {
            state.isLoading = false;
            state.error = action.payload.error;
        },
        logout(state) {
            state.token = null;
            state.role = null;
            state.userId = null;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
            state.error = null;
            localStorage.setItem('role', action.payload.role);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = (action.payload as { error: string })?.error || 'An error occurred';
        });
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
