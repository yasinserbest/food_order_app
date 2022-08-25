import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");

let isLoggedIn;
if (initialEmail !== null) {
  isLoggedIn = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken || null,
    isLoggedIn,
    email: initialEmail || null,
  },
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = !state.isLoggedIn;
      localStorage.setItem("token", state.token);
      localStorage.setItem("email", state.email);
    },
    logoutHandler(state, action) {
      state.token = "";
      state.email = "";
      state.isLoggedIn = !state.isLoggedIn;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    toggleLoginStatus(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
