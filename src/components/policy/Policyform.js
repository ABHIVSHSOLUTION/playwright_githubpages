import React, { useRef} from 'react'

export default function Policyform(props) {
  const nameRef = useRef("");
  const amountRef = useRef("");
  const limitRef = useRef("");


  const { selectedPolicy, operation } = props

  console.log(selectedPolicy, operation, "policy form")

  if (operation === "Update") {
    nameRef.current.value = selectedPolicy.name;
    limitRef.current.value = selectedPolicy.limit;
    amountRef.current.value = selectedPolicy.amount;
  }
  

  const handleClick = (pid) => {
    let name = nameRef.current.value;
    let amount = amountRef.current.value;
    let limit = limitRef.current.value;
    let obj = { name: name, amount: amount, limit: limit }
    if (operation === "Add") {
      props.handleAdd(obj)
      console.log(obj)
      nameRef.current.value = "";
      amountRef.current.value = "";
      limitRef.current.value = "";
    }
    if (operation === "Update") {
      name = nameRef.current.value;
      amount = amountRef.current.value;
      limit = limitRef.current.value;
      let newobj = { pid: pid, name: name, amount: amount, limit: limit }
      props.handleUpdate(newobj)
      nameRef.current.value = "";
      amountRef.current.value = "";
      limitRef.current.value = "";
    }

  }
    return (
      <>
        <div className="container  " style={{
          marginLeft: "13rem",
          marginTop: "2rem"
        }}>
          <div className="mb-4 row  ">
            <label htmlFor="PolicyName" className="col-sm-2 col-form-label ">
              Policy Name :
            </label>
            <div className="col-sm-4">
              <input type="text" className="form-control" ref={nameRef} />
            </div>
          </div>
          <div className="mb-4 row">
            <label htmlFor="Amount" className="col-sm-2 col-form-label">
              Amount :
            </label>
            <div className="col-sm-4">
              <input type="Number" className="form-control" ref={amountRef} />
            </div>
          </div>
          <div className="mb-4 row">
            <label htmlFor="Maxlimit" className="col-sm-2 col-form-label">
              Max Limit :
            </label>
            <div className="col-sm-4">
              <input type="Number" className="form-control" ref={limitRef} />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark col-2 text-center  "
            style={{
              position: "relative",
              right: "12rem"
            }}
            onClick={() => handleClick(selectedPolicy.pid)}
          >
            {operation}
          </button>
        </div>
      </>
    )
  }



