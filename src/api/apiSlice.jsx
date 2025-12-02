import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { dataToQueryParameter } from "./APIHelper";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://testportal.igi.com.pk:8801/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
        },
    }),

    endpoints: (builder) => ({
        get: builder.query({
            query: (endpoint) => endpoint,
        }),
        post: builder.mutation({
            query: (arg) => ({
                url: arg.params
                    ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
                    : arg?.endpoint,
                method: "POST",

                body: arg?.data,
                headers: arg?.headers ? arg?.headers : {
                    "Content-Type": "application/json",
                },
            })
        }),
        put: builder.mutation({
            query: (arg) => ({
                // url: arg.endpoint,
                url: arg.params
                    ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
                    : arg?.endpoint,
                method: "PUT",
                body: arg.data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        delete: builder.mutation({
            query: (arg) => ({
                url: arg.params
                    ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
                    : arg.endpoint,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: arg?.data,
            }),
        }),

        patch: builder.mutation({
            query: (arg) => ({
                url: arg.params
                    ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
                    : arg.endpoint,
                method: "PATCH",
                body: arg?.data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    })
})


export const { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation, usePatchMutation } = apiSlice