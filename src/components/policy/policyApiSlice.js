import { apiSlice } from "../../app/api";
import { createEntityAdapter } from "@reduxjs/toolkit";


const policyAdapter = createEntityAdapter();

export const initialState = policyAdapter.getInitialState({
  tableHeader: ["Id ", "Policy Name", "Amount", "Max Limit", "Actions"],
  policy: [],
  selectedPolicy: {},
  operation: "Add",
  status: "policy",
});

export const policyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPolicy: builder.query({
            query: () => "/policies",
            transformResponse: (res) => {
            return policyAdapter.setAll(initialState, res)
            },
            providesTags : ["Policy"]
        }),
        addPolicy: builder.mutation({
            query: (data) => ({
                url: "/policies/add",
                method: "POST",
                body: data,
            
            }),
            invalidatesTags: [{type:"Policy"}]

        }),       deletePolicy: builder.mutation({
            query: (id) => ({
              url: `/policies/${id}/delete`,
              method: "POST",
              
            }),
            invalidatesTags: [{ type: "Policy" }],
        }),
        updatepolicy: builder.mutation({
            query: (obj) => ({
              url: `/policies/update`,
                method: "PUT",
              body : obj
              
            }),
            invalidatesTags: [{ type: "Policy" }],
          })
       
    })
})

export const { useGetPolicyQuery  , useAddPolicyMutation , useDeletePolicyMutation ,useUpdatepolicyMutation} = policyApiSlice;