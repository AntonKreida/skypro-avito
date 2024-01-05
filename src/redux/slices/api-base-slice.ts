/* eslint-disable no-console */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


import { IResponseLogin } from "@interfaces/";

import { setUserLogin, setLoginOutUser } from "./user";
import { type RootState } from "../store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.access_token;

    if(token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
FetchArgs | string,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if(result.error && result.error.status === 401) {
    const { access_token, refresh_token } = (api.getState() as RootState).user;

    const resultRefreshToken = await baseQuery({
      url: "/auth/login",
      method: "PUT",
      body: {
        access_token,
        refresh_token
      }
    }, api, extraOptions);

    if(resultRefreshToken) {
      api.dispatch(setUserLogin(resultRefreshToken.data as IResponseLogin));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLoginOutUser());
    }
  }

  return result;
};

export const apiBaseSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Ads", "User", "AdsUser", "Ad", "AdComment"],
});
