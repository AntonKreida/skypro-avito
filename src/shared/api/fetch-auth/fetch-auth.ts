import { isAxiosError, AxiosError } from "axios";

import { IResponseLogin } from "@interfaces/";

import { base } from "../base";


interface IRequestSignUp {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    city?: string;
    phone?: string;
    role?: string;
}


export const getLogin = async (email: string, password: string) => {
  try {
    const { data } = await base.post<IResponseLogin>("/auth/login", {
      email,
      password
    });
    return data;
  } catch (errors) {
    if(isAxiosError(errors)) {
      throw new AxiosError(errors.response?.data.detail);
    }

    throw new Error("Что-то пошло не так...");
  }
};

export const postSignUp = async (dataForm:IRequestSignUp) => {
  try {
    const { data } = await base.post("/auth/register", dataForm);

    return data;
  } catch (errors) {
    if(isAxiosError(errors)) {
      throw new AxiosError(errors.response?.data.detail);
    }
  
    throw new Error("Что-то пошло не так...");
  }
};
