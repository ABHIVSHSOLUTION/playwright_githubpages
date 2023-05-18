import {  createSlice } from '@reduxjs/toolkit';
import { initialState } from './policyApiSlice';

const policySlice = createSlice({
    name: "policy",
    initialState,
    reducers: {
        setSelectedPolicy: (state, action) => {
            
            state.selectedPolicy = action.payload
        },
        setOperations: (state, actions) => {
            state.operation = actions.payload;
        },
    }
})

export const  getSelectedPolicy = (state)=>state.poilcyStore.selectedPolicy
export const  getOperation = (state)=>state.poilcyStore.operation

export const {

    setSelectedPolicy,
    setOperations,
  
  } = policySlice.actions;
  export default policySlice.reducer;


