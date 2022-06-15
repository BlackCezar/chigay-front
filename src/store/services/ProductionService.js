import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productionsAPI = createApi({
  reducerPath: "productionsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/productions" }),
  tagTypes: ["Productions"],
  endpoints: (build) => ({
    getProductinos: build.query({
      query: (params) => ({ url: "/", params }),
      providesTags: ["Productions"],
      transformResponse: (response) => response.array,
    }),
    getProduction: build.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ["Productions"],
      transformResponse: (response) => response.object,
    }),
    createProduction: build.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Productions"],
    }),
    updateProduction: build.mutation({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Productions"],
    }),
    deleteProduction: build.query({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Productions"],
    }),
  }),
});

export const {
  useCreateProductionMutation,
  useGetProductinosQuery,
  useGetProductionQuery,
  useDeleteProductionQuery,
  useLazyDeleteProductionQuery,
  useUpdateProductionMutation,
} = productionsAPI;
