import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api";

const userAdapter = createEntityAdapter();

export const initialState = userAdapter.getInitialState({
  tableHeader: ["Id ", "Name", "Email", "Actions"],
  users: [],
  selectedUser: {},
  operation: "Add",
  status: "user",
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (response) => {
        return userAdapter.setAll(initialState, response);
      },
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User" }],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...obj }) => ({
        url: `users/update/${id}`,
        method: "PUT",
        body: obj,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
