import React from "react";
import Table from "../../common/Table";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserForm from "./UserForm";

import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "./userApiSlice";
import {
  getOperation,
  getSelectedUser,
  setOperations,
  setSelectedUser,
} from "./userReducer";

function User(props) {
  const CurrentSelectedUsers = useSelector(getSelectedUser);
  const CurrentOperation = useSelector(getOperation);
  console.log(CurrentOperation, "coperation");
  const dispatch = useDispatch();
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery();

  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  let content;

  if (isLoading) {
    content = `<p>...Loading</p>`;
  } else if (isSuccess) {
    content = (
      <>
        <div className="container">
          <p
            className=" display-4 text-center"
            style={{ marginTop: "3rem", marginRight: "12rem" }}
          >
            Users Details
          </p>
          <UserForm
            handleAdd={(name, email) => add(name, email)}
            handleUpdate={(name, email, uid) => update(name, email, uid)}
            selectedUser={CurrentSelectedUsers}
            operation={CurrentOperation}
          />

          <Table
            tableHeader={data.tableHeader}
            tableData={data.entities}
            ids={data.ids}
            handleDelete={(obj) => deletebyID(obj)}
            handleEdit={(obj) => edit(obj)}
            status={data.status}
          />

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </>
    );
  } else if (isError) {
    content = `<p>404 not Found </p>`;
  }

  const add = (name, email) => {
    let obj = Object.assign({ name: name, email: email });
    addUser(obj);
    toast.success("Successfully Added to Database!!");
  };

  const edit = (obj) => {
    dispatch(setSelectedUser(obj));
    dispatch(setOperations("Update"));
  };

  const deletebyID = (id) => {
    deleteUser(id);
    toast.error("Successfully Delete from Database!!");
  };

  const update = (name, email, uid) => {
    console.log(name, email, uid, "update user");
    dispatch(setOperations("Add"));
    let obj = Object.assign({ name: name, email: email });
    dispatch(updateUser({ id: uid, ...obj }));
    toast.success("Successfully Updated to Database!!");
  };

  return <>{content}</>;
}

export default User;
