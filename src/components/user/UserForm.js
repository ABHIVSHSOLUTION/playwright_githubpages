import React, { useRef } from "react";

export default function UserForm(props) {
  const nameRef = useRef("");
  const emailRef = useRef("");

  const { selectedUser, operation } = props;
  if (operation === "Update") {
    nameRef.current.value = "selectedUser.uname";
    emailRef.current.value = selectedUser.email;
  }

  const handleSubmit = async (uid) => {
    console.log("operation", operation);
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    if (operation === "Add") {
      await props.handleAdd(name, email);
    }
    if (operation === "Update") {
      name = nameRef.current.value;
      email = emailRef.current.value;
      console.log("hello upadte");
      await props.handleUpdate(name, email, uid);
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <>
      <div className="container mt-5 px-5 offset-2 ">
        <div className="row mb-3 col-sm-5">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              ref={nameRef}
              className="form-control"
              id="inputPassword3"
            />
          </div>
        </div>
        <div className="row mb-3 col-sm-5">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              id="inputEmail3"
            />
          </div>
        </div>
        <input
          type="button"
          onClick={() => handleSubmit(selectedUser.uid)}
          className="btn btn-success offset-2 "
          value={operation}
        ></input>
      </div>
    </>
  );
}
