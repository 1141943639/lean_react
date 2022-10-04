import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "todos",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getByUserId: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: (userId) => ({
        url: `/todos?userId=${userId}`,
      }),
    }),
    update: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: (data) => ({
        url: `/todos`,
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    add: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: (data) => ({
        url: `/todos`,
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    delete: builder.mutation({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetByUserIdMutation,
  useUpdateMutation,
  useAddMutation,
  useDeleteMutation,
} = todosSlice;
export default todosSlice;
