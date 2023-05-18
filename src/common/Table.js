import React, { useState } from "react";

export default function Table(props) {
  const { tableHeader, tableData, status, ids } = props;


  const [camount, setcmount] = useState(0);

  const deleteByID = (obj) => {

    props.handleDelete(obj);
  };

  const editByID = (obj) => {

    props.handleEdit(obj);
  };

  const handlechange = (e) => {

    setcmount(e.target.value);
  };
  const buttonClick = (upid, status) => {
    // console.log(state.camount);
    let updateobj = {
      upid: upid,
      camount: camount,
      status: "Claim",
    };
    props.UpdateClaim(updateobj);

  };

  const AcceptClick = (upid, status) => {
    let updateobj = {
      upid: upid,
      status: "Accept",
    };
    props.handleAccept(updateobj);
  };
  const RejectClick = (upid, status) => {
    let updateobj = {
      upid: upid,
      status: "Reject",
    };
    props.handleReject(updateobj);
  };

  const displayHeader = tableHeader.map((el, i) => {
    return <th key={i}>{el}</th>;
  });

  // eslint-disable-next-line array-callback-return
  const showData = ids.map((el, i) => {
    if (status === "user") {
      return (
        <tr id={`id-${tableData[el].uname}`} key={i}>
          <td>{tableData[el].uid}</td>
          <td>{tableData[el].uname}</td>
          <td>{tableData[el].email}</td>

          <td>
            <span
              className="fa fa-edit mx-3 text-success"
              onClick={() => editByID(tableData[el])}
            ></span>
            <span
              className="fa fa-trash mx-3 text-danger"
              onClick={() => deleteByID(el)}
            ></span>
          </td>
        </tr>
      );
    } else if (status === "policy") {
      return (
        <>
          <tr key={i}>
            <td>{tableData[el].pid}</td>
            <td>{tableData[el].name}</td>
            <td>{tableData[el].amount}</td>
            <td>{tableData[el].limit}</td>

            <td>
              <span
                className="fa fa-edit mx-3 text-success"
                onClick={() => editByID(tableData[el])}
              ></span>
              <span
                className="fa fa-trash mx-3 text-danger"
                onClick={() => deleteByID(el)}
              ></span>
            </td>
          </tr>
        </>
      );
    } else if (status === "one" && tableData[el].status ==="") {
   
      return (
        <>
          <tr key={i}>
            <td>{tableData[el].upid}</td>
            <td>{tableData[el].uname}</td>
            <td>{tableData[el].pname}</td>
            <td>{tableData[el].amount}</td>
            <td>{tableData[el].limit}</td>
            <td>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  onChange={(e) => handlechange(e)}
                  className="form-control"
                />
              </div>
            </td>
            <td>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  buttonClick(tableData[el].upid, tableData[el].status);
                }}
              >
                Claim
              </button>
            </td>
          </tr>
        </>
      );
    } else if (status === "Claim" && tableData[el].status === "Claim" ) {
      return (
        <>
          <tr key={i}>
            <td>{tableData[el].upid}</td>
            <td>{tableData[el].uname}</td>
            <td>{tableData[el].pname}</td>
            <td>{tableData[el].amount}</td>
            <td>{tableData[el].limit}</td>
            <td>{tableData[el].camount}</td>
            <td>
              <button
                className="btn btn-outline-success mx-2"
                onClick={() => {
                  AcceptClick(tableData[el].upid, tableData[el].status);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-outline-danger mx-2"
                onClick={() => {
                  RejectClick(tableData[el].upid, tableData[el].status);
                }}
              >
                Reject
              </button>
            </td>
          </tr>
        </>
      );
    }
    if (status === "Accept" && tableData[el].status === "Accept") {
      return (
        <>
          <tr key={i}>
            <td>{tableData[el].upid}</td>
            <td>{tableData[el].uname}</td>
          </tr>
        </>
      );
    }
    if (status === "Reject" &&  tableData[el].status === "Reject") {
      return (
        <>
          <tr key={i}>
            <td>{tableData[el].upid}</td>
            <td>{tableData[el].uname}</td>
          </tr>
        </>
      );
    }
  });

  return (
    <div className=" mt-5 px-5 ">
      <table className="table my-3 table-responsive-lg  table-bordered table-dark table-striped">
        <thead>
          <tr>{displayHeader}</tr>
          <tr></tr>
        </thead>
        <tbody>{showData}</tbody>
      </table>
    </div>
  );
}
