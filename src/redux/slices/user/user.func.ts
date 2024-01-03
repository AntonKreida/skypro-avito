import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { IRequestDataForSignUpUser, IResponseErrorLogin, IResponseLogin } from "@interfaces/";
import { base } from "@shared/";


type TDataFormLoginUser = {
    email: string;
    password: string;
}

export const postLoginUser = createAsyncThunk<
IResponseLogin,
TDataFormLoginUser,
{rejectValue: string}>(
  "/auth/login",
  async (dataForm, thunkApi) => {
    try {
      const { data } = await base.post<IResponseLogin>("/auth/login", dataForm);
      return data;
    } catch (errors) {
      if(isAxiosError(errors)) {
        return thunkApi.rejectWithValue((errors.response?.data as IResponseErrorLogin).detail);
      }
    
      return thunkApi.rejectWithValue("Что-то пошло не так...");
    }
  }
);

export const postSignUpUser = createAsyncThunk<null, IRequestDataForSignUpUser, {rejectValue: string}>(
  "/auth/register",
  async (dataForm, thunkApi) => {
    try {
      await base.post("/auth/register", dataForm);
      return null;
    } catch (errors) {
      if(isAxiosError(errors)) {
        return thunkApi.rejectWithValue((errors.response?.data as IResponseErrorLogin).detail);
      }
    
      return thunkApi.rejectWithValue("Что-то пошло не так...");
    }
  }
);
