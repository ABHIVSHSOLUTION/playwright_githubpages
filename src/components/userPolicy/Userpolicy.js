import React from "react";
// import { connect } from "react-redux";
import UserPolicyForm from "./UserPolicyForm";
import Table from "../../common/Table";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  useAddUserPolicyMutation,
  useGetUserPolicyQuery,
  useUpdateUserPolicyMutation,
} from "./userPolicyApiSlice";
import { useGetUsersQuery } from "../user/userApiSlice";

import { useGetPolicyQuery } from "../policy/policyApiSlice";

function Userpolicy() {
  // const users = useSelector(getUsers)
  const x = useGetUsersQuery();
  const users = x.data;
  const p = useGetPolicyQuery();
  const policy = p.data;

  const { data, isError, isLoading, isSuccess } = useGetUserPolicyQuery();
  const [addUserPolicies] = useAddUserPolicyMutation();
  const [updateUserPolicy] = useUpdateUserPolicyMutation();

  console.log(data, "<<<<<<<<<userPolicy");
  let content;

  if (isLoading) {
    content = `<p>...Loading</p>`;
  } else if (isSuccess) {
    content = (
      <>
        <div className="container text-center">
          <p className=" display-4 " style={{ marginTop: "3rem" }}>
            Users Policy
          </p>

          <UserPolicyForm
            users={users.entities}
            policy={policy.entities}
            handleAdd={(obj) => {
              add(obj);
            }}
          />

          <Table
            tableData={data.entities}
            tableHeader={data.tableHeader}
            ids={data.ids}
            status={data.status}
            UpdateClaim={(obj) => update(obj)}
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

  const add = (obj) => {
    console.log(
      obj,
      " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<in add userpolicy "
    );
    let max = Math.max(...data.ids) + 1;
    console.log({ max });
    // let newobj = {
    //   upid: max,
    //   id: max,

    //   amount: obj.amount,
    //   limit: obj.limit,
    //   name: obj.name,
    //   pid: obj.pid,
    //   status: "",
    //   uid: obj.uid,
    //   uname: obj.uname,
    // };
    addUserPolicies(obj);
    toast.success("Successfully Added to Database!!");
  };

  const update = (obj) => {
    console.log(obj, "userpolicy");
    updateUserPolicy(obj);
    toast.success("Successfully Added to ClaimSettlement!!");
  };

  return <> {content}</>;
}

export default Userpolicy;
