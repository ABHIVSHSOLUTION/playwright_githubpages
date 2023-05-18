import React from "react";
// import { connect } from "react-redux";
import Policyform from "./Policyform";
import Table from "../../common/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { operations, selectedPolicy } from "./reducer";
// import { addPolicyThunk, deletePolicyThunk, updatePolicyThunk } from "./policyService";
import { useAddPolicyMutation, useDeletePolicyMutation, useGetPolicyQuery } from "./policyApiSlice";
import { getOperation, getSelectedPolicy, setOperations, setSelectedPolicy } from "./policyReducer";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../user/userApiSlice";


function Addpolicy() {
  const CurrentSelectedPolicy = useSelector(getSelectedPolicy);
  const CurrentOperation = useSelector(getOperation);
  const dispatch = useDispatch();


  const x = useGetPolicyQuery()
  console.log(x, "in add policy")
  const { data, isError, isLoading, isSuccess } = useGetPolicyQuery();
  const [addPolicys] = useAddPolicyMutation()
  const [deletePolicy] = useDeletePolicyMutation()
  const [updatePolicy] = useUpdateUserMutation()




  let content;
  if (isLoading) {
    content = `<p>...Loading</p>`;
  } else if (isSuccess) {
    content = (
      <>
        <div className="container text-center">
        <p className=" display-4 " style={{ marginTop: "3rem" }}>
          ADD POLICY
        </p>
        <Policyform
          handleAdd={(obj) => {
            addpolicy(obj);
          }}
          handleUpdate={(obj) => {
            update(obj);
          }}
          selectedPolicy={CurrentSelectedPolicy}
          operation={CurrentOperation}
        />
     
          <Table
            tableHeader={data.tableHeader}
            tableData={data.entities}
            ids={data.ids}
            handleDelete={(id) => deletebyID(id)}
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



// console.log(selectedPolicy , "in addpolicy")
 const addpolicy = (obj) => {
    console.log(obj, " add policy");
    addPolicys(obj);
    toast.success("Successfully Added to Database!!");
  };

  const edit = (obj)=>{
    console.log(obj , " in edit addpolicy")
    dispatch(setSelectedPolicy(obj))
    dispatch(setOperations("Update"))
  }

 const deletebyID = (id)=>{
    
    console.log({id} )
    deletePolicy(id)
    toast.error("Successfully Delete from Database!!");
  }

 const update = (obj)=>{
    console.log(obj)
    dispatch(setOperations("Add"))
    updatePolicy(obj)
    toast.success("Successfully Updated to Database!!");
  }




  return (
    <>
       {content}
    </>
  );
}


export default Addpolicy;
