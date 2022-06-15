import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/products" }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({ url: "/", params }),
      providesTags: ["Products"],
      transformResponse: (response) => response.array,
    }),
    getProduct: build.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ["Products"],
      transformResponse: (response) => response.object,
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.query({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductQuery,
  useLazyDeleteProductQuery,
  useUpdateProductMutation,
} = productsAPI;
