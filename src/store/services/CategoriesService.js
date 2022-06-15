import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/categories" }),
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: (params) => ({ url: "/", params }),
      providesTags: ["Categories"],
      transformResponse: (response) => response.array,
    }),
    getCategoy: build.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ["Categories"],
      transformResponse: (response) => response.object,
    }),
    createCategoy: build.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategoy: build.mutation({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategoy: build.query({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoyMutation,
  useGetCategoriesQuery,
  useGetCategoyQuery,
  useDeleteCategoyQuery,
  useLazyDeleteCategoyQuery,
  useUpdateCategoyMutation,
} = categoriesAPI;
