import React from "react";


import Table from "../../common/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useClaimPolicyMutation, useGetUserPolicyQuery } from "../userPolicy/userPolicyApiSlice";

function Claimsettlement() {

  const { data, isError, isLoading, isSuccess } = useGetUserPolicyQuery();

  const [claim] = useClaimPolicyMutation();



  const accept = (obj) => {
    // AcceptClaim(obj);
    claim(obj)
    console.log(obj);
    toast.success("Your Claim is Approved!!");
  }

  const reject = (obj) => {
    // RejectClaim(obj);
    claim(obj)
    console.log(obj);
    // toast.danger("Your Claim is Reject!!");
  };



  let content;

  if (isLoading) {
    content = `<p>...Loading</p>`;
  } else if (isSuccess) {
    content = (
      <>
       <div className="container text-center">
      <p className=" display-4 " style={{ marginTop: "3rem" }}>
        Claimsettlement
      </p>

      <Table
        ids={data.ids}
        tableHeader={data.tableHeader}
        tableData={data.entities}
        status="Claim"
        handleReject={(obj) => {
          reject(obj);
        }}
        handleAccept={(obj) => {
          accept(obj);
        }}
      />
      <Table
        ids={data.ids}
        tableHeader={data.newHeader}
        tableData={data.entities}
        status="Accept"
      />
      <Table
        ids={data.ids}
        tableHeader={data.newHeader}
        tableData={data.entities}
        status="Reject"
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

  return <> { content }</>









}


export default Claimsettlement;;
