
import { configureStore } from "@reduxjs/toolkit";
import { policyApiSlice } from "../components/policy/policyApiSlice";
import policyReducer from "../components/policy/policyReducer";
import { userApiSlice } from "../components/user/userApiSlice";
import userReducer from "../components/user/userReducer";
import { userPolicyApiSlice } from "../components/userPolicy/userPolicyApiSlice";
import { apiSlice } from "./api";


export const store = configureStore({
  reducer: {
    userStore: userReducer,
    poilcyStore : policyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
});

store.dispatch(userApiSlice.endpoints.getUsers.initiate());
store.dispatch(policyApiSlice.endpoints.getPolicy.initiate())
store.dispatch(userPolicyApiSlice.endpoints.getUserPolicy.initiate())
