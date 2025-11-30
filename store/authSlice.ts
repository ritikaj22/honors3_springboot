import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export interface AuthState {
  user: any | null;
  loading: boolean;
  authChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  authChecked: false,
};

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUser",
  async () => {
    const stored = await SecureStore.getItemAsync("user");
    return stored ? JSON.parse(stored) : null;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:9099/users/sign-in", {
      email,
      password,
    });
    await SecureStore.setItemAsync("user", JSON.stringify(response.data));
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: any) => {
    const response = await axios.post("http://localhost:9099/users", payload);
    await SecureStore.setItemAsync("user", JSON.stringify(response.data));
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await SecureStore.deleteItemAsync("user");
  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.authChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
