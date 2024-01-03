import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

import { IResponseLogin } from "@interfaces/";

import { postLoginUser, postSignUpUser } from "./user.func";


type TState = {
    access_token: string | null;
    refresh_token: string | null;
    token_type: string | null;
    isLoading: boolean;
    errorMessage: string | null;
    isAuthUser: boolean;
} 


const initialState: TState = {
  access_token: null,
  refresh_token: null,
  token_type: null,
  isLoading: false,
  errorMessage: null,
  isAuthUser: false,
};


export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin(state, action: PayloadAction<IResponseLogin>) {
      const { access_token, refresh_token, token_type } = action.payload;

      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.token_type = token_type;
      state.isAuthUser = true;
    },
    setLoginOutUser(state) {
      state.access_token = null;
      state.refresh_token = null;
      state.token_type = null;
      state.isAuthUser = false; 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.isAuthUser = true;

      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.token_type = action.payload.token_type;
    });
    builder.addCase(postLoginUser.pending, (state) => {
      state.errorMessage = null;
      state.isLoading = true;
      state.isAuthUser = false;
    });
    builder.addCase(postLoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload || "Что-то пошло не так...";
      state.isAuthUser = false;
    });
    builder.addCase(postSignUpUser.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(postSignUpUser.pending, (state) => {
      state.errorMessage = null;
      state.isLoading = true;
    });
    builder.addCase(postSignUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload || "Что-то пошло не так...";
    });
  }
});

export const { setUserLogin, setLoginOutUser } = sliceUser.actions;
