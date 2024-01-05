import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

import { IUser } from "@interfaces/";


const initialState: IUser = {
  id: 0,
  name: "",
  email: "",
  city: "",
  avatar: "",
  sells_from: "",
  phone: "",
  surname: ""
};


export const sliceSalesman = createSlice({
  name: "salesman",
  initialState,
  reducers: {
    setCurrentSalesman(state, action: PayloadAction<IUser>) {
      state = action.payload;
      return state;
    },
  },
});

export const { setCurrentSalesman } = sliceSalesman.actions;
