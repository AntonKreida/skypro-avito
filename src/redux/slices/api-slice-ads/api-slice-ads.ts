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
    getAdsUser: builder.query<IAsd[], null>({
      query: () => ({
        url: "/ads/me",
        method: "GET",
      }),
      providesTags: ["AdsUser"],
    })
  }),
});

export const { useGetAdsQuery, useGetAdsUserQuery } = apiSliceAds;
