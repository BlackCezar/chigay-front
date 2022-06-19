import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/orders" }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: (params) => ({ url: "/", params }),
      providesTags: ["Orders"],
      transformResponse: (response) => response.array,
    }),
    getOrder: build.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: ["Orders"],
      transformResponse: (response) => response.object,
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: build.mutation({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: build.query({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["Orders"],
    }),
    sendMessage:  build.mutation({
      query: (data) => ({
        url: "/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useLazyDeleteOrderQuery,
  useUpdateOrderMutation,
  useSendMessageMutation
} = ordersAPI;
