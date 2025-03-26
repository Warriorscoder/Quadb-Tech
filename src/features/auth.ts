import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

export interface UserState {
  name: string;
  email: string;
  isAuthenticated: boolean; 
}

const initialState: UserState = {
  name: "",
  email: "",
  isAuthenticated: false, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true; 
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isAuthenticated = false; 
    },
  },
});

export const { login, logout } = userSlice.actions;


const persistConfig = {
  key: "user",
  storage,
};


export default persistReducer(persistConfig, userSlice.reducer);
