import { IRequestDataUpdateUser, IUser } from "@interfaces/";

import { apiBaseSlice } from "../api-base-slice";


const apiSliceProfile = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserProfile: builder.query<IUser, null>({ 
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    postLoaderUserAvatar: builder.mutation<IUser, FormData>({
      query: (dataForm) => ({
        url: "/user/avatar",
        method: "POST",
        body: dataForm,
      }),
      invalidatesTags: ["User"],
    }),
    patchUpdateUserProfile: builder.mutation<IUser, IRequestDataUpdateUser>({
      query: (dataForm) => ({
        url: "/user",
        method: "PATCH",
        body: { ...dataForm },
      }),
      invalidatesTags: ["User"],
    })
  }),
});

export const { 
  useGetCurrentUserProfileQuery,
  usePostLoaderUserAvatarMutation,
  usePatchUpdateUserProfileMutation, 
} = apiSliceProfile;
