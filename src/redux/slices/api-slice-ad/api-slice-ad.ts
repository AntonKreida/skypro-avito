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
    }),
    deleteImagesAd: builder.mutation<IAsd, {
      idAd: string | number;
      imgUrl: string;
    }>({
      query: (data) => ({
        url: `/ads/${data.idAd}/image?file_url=${data.imgUrl}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ad"],
    }),
    patchCurrentAd: builder.mutation<IAsd, {
      id: number | string;
      title?: string;
      description?: string;
      price?: number;
    }>({
      query: (data) => ({
        url: `/ads/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Ad"],
    })
  })
});

export const {
  useGetAdQuery,
  useGetAdCommentQuery,
  usePostCreateAdCommentMutation,
  useDeleteImagesAdMutation,
  usePatchCurrentAdMutation,
} = apiSliceAd;
