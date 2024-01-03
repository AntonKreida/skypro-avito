import { IAsd } from "@interfaces/";

import { apiBaseSlice } from "../api-base-slice";


const apiSliceAds = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<IAsd[], null>({ 
      query: () => ({
        url: "/ads",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdsQuery } = apiSliceAds;
