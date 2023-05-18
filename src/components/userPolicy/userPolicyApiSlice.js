import { apiSlice } from "../../app/api";
import { createEntityAdapter } from "@reduxjs/toolkit";
const userPolicyAdapter = createEntityAdapter();

export const initialState = userPolicyAdapter.getInitialState({
  tableHeader: [
    "Id ",
    "Name",
    "Policy Name ",
    "Amount ",
    "Max Limit",
    "Claim Amount",
    "Actions",
    ],

    newHeader : ["ID" , "Name"],
  usersPolicy: [],
  status: "one",
});


export const userPolicyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserPolicy: builder.query({
            query: () => "/userpolicy",
            transformResponse: (res) => {
                return userPolicyAdapter.setAll(initialState , res)
            },
            providesTags : ["UserPolicy"]
        }),
        addUserPolicy: builder.mutation({
            query: (obj) => ({
                url: "/userpolicy/add",
                method: "POST",
                body: obj,
              
            }),
            invalidatesTags: [{type:"UserPolicy"}]

        })
        ,
        updateUserPolicy: builder.mutation({
            query: (obj) => ({
                url: "/userpolicy/update",
                method: "PUT",
                body: obj,
              
            }),
            invalidatesTags: [{type:"UserPolicy"}]

        }),
        claimPolicy: builder.mutation({
            query: (obj) => ({
                url: '/userpolicy/update/accept',
                method: 'PUT',
                body : obj 
            }),
            invalidatesTags: [{type:"UserPolicy"}]
        }),
     
        
    })
})

export const { useGetUserPolicyQuery , useAddUserPolicyMutation , useUpdateUserPolicyMutation , useClaimPolicyMutation} = userPolicyApiSlice;