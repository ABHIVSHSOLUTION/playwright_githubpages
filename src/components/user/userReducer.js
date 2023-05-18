import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./userApiSlice";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOperations: (state, actions) => {
      console.log(actions.payload, "actionspayalod");
      state.operation = actions.payload;
    },
  },
});

export const getSelectedUser = (state) => state.userStore.selectedUser;
export const getOperation = (state) => state.userStore.operation;
export const getUsers = (state) => state.userStore.entities;

export const { setSelectedUser, setOperations } = usersSlice.actions;
export default usersSlice.reducer;

// export const  setSelectedUser = createAction('setSelectedUser')
// export const setOperation = createAction('setOperation')

// const  userReducer = createReducer(initialState, (builder) => {
//   builder
//       .addCase(setSelectedUser, (state, action) => {
//         console.log(action , " <<<<")
//       state.selectedUser = action.payload
//     })
//       .addCase(setOperation, (state, action) => {
//         console.log(action , " <<<<")
//       state.operation = action.payload
//     })

// })

// export default userReducer;
