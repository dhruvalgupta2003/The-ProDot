import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: {avatar},
                credentials: "include" as const,
            })
        }),
        editProfile: builder.mutation({
            query: ({name}) => ({
                url: "update-user-info",
                method: "PUT",
                body: {name},
                credentials: "include" as const,
            })
        }),
        updatePassword: builder.mutation({
            query: ({oldPassword, newPassword}) => ({
                url: "update-user-password",
                method: "PUT",
                body: {oldPassword,newPassword},
                credentials: "include" as const,
            })
        }),
        getUsersPhoneNo: builder.query({
            query: () => ({
                url: "get-users-phone-no",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        createDealer: builder.mutation({
            query:(data) =>({
                url:"create-dealer",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        })
    })
})

export const {useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation, useGetUsersPhoneNoQuery, useCreateDealerMutation} = userApi;