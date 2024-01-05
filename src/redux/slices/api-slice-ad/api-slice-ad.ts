import { IAsd, IComment } from "@interfaces/";

import { apiBaseSlice } from "../api-base-slice";


const apiSliceAd = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAd: builder.query<IAsd, string>({ 
      query: (id) => ({
        url: `/ads/${id}`,
        method: "GET",
      }),
      providesTags: ["Ad"],
    }),
    getAdComment: builder.query<IComment[], string>({
      query: (idAd) => ({
        url: `/ads/${idAd}/comments`,
        method: "GET",
      }),
      providesTags: ["AdComment"],
    }),
    postCreateAdComment: builder.mutation<IComment, {id: string ; text: string}>({
      query: (dataForm) => ({
        url: `/ads/${dataForm.id}/comments`,
        method: "POST",
        body: {
          text: dataForm.text,
        },
      }),
      invalidatesTags: ["AdComment"],
    })
  })
});

export const {
  useGetAdQuery,
  useGetAdCommentQuery,
  usePostCreateAdCommentMutation,
} = apiSliceAd;
