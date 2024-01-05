import { IAsd, IRequestCreateAsdImages, IRequestCreateAsdText } from "@interfaces/";

import { apiBaseSlice } from "../api-base-slice";


const apiSliceAds = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<IAsd[], null>({ 
      query: () => ({
        url: "/ads",
        method: "GET",
      }),
      providesTags: ["AdsUser", "Ads"],
    }),
    getAdsUser: builder.query<IAsd[], null>({
      query: () => ({
        url: "/ads/me",
        method: "GET",
      }),
      providesTags: ["AdsUser"],
    }),
    postCreateAdsText: builder.mutation<IAsd, IRequestCreateAsdText>({
      query: (dataForm) => ({
        url: "/adstext",
        method: "POST",
        body: { ...dataForm },
      }),
      invalidatesTags: ["AdsUser", "Ads"],
    }),
    postCreateAdsImage: builder.mutation<IAsd, IRequestCreateAsdImages>({
      query: (dataForm) => ({
        url: `/ads/${dataForm.id}/image`,
        method: "POST",
        body: dataForm.files,
      }),
      invalidatesTags: ["AdsUser", "Ads"],
    }),
    getAdsSalesman: builder.query<IAsd[], string | number>({
      query: (idSalesman) => ({
        url: `/ads?user_id=${idSalesman}`,
        method: "GET",
      }),
    }),
    deleteAds: builder.mutation<IAsd, string | number>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdsUser", "Ads", "Ad"],
    })
  }),
});

export const {
  useGetAdsQuery, 
  useGetAdsUserQuery, 
  useGetAdsSalesmanQuery,
  usePostCreateAdsTextMutation, 
  usePostCreateAdsImageMutation,
  useDeleteAdsMutation,
} = apiSliceAds;
