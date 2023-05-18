

import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const claimAdapter = createEntityAdapter();

const initialState = claimAdapter.getInitialState({
    tableHeader: ["Id ", "Name", "Policy Name ", "Amount ", "Max Limit", "Claim Amount", "Actions"],
    newHeader : ["ID" , "Name"]
    
    
  });    
  

const claimPolicySlice = createSlice({
  name: "claimpolicy",
  initialState,
  reducers: {
    
  },
  
})


export default claimPolicySlice.reducer;


