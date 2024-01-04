import { IUser } from "@interfaces/";

import { apiBaseSlice } from "../api-base-slice";


const apiSliceProfile = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserProfile: builder.query<IUser, null>({ 
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentUserProfileQuery } = apiSliceProfile;
