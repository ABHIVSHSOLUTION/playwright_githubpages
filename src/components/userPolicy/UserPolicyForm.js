import React, { useState } from "react";
import Select from "react-select";

export default function UserPolicyForm(props) {
  const { users, policy } = props;

  const usersArray = Object.values(users).map((el) => el);
  console.log({ usersArray });
  const policyArray = Object.values(policy).map((el) => el);
  console.log({ policyArray });

  const [selectedUser, setSelectedUser] = useState({});
  const [selectedPolicy, setSelectedPolicy] = useState({});

  const handleChange = (selectedOption, str) => {
    if (str === "user") {
      setSelectedUser(selectedOption);

      console.log(selectedOption.uid);
    }
    if (str === "policy") {
      setSelectedPolicy(selectedOption);
      console.log(selectedOption, " in else policy");
    }
  };

  const handleClick = () => {
    console.log("on add", selectedUser, selectedPolicy);

    let userid = selectedUser.uid;
    console.log(userid, "handleclick");
    let policyid = selectedPolicy.pid;
    let idobj = {
      
      uid: userid,
      uname: selectedUser.uname,
      pid: policyid,
      name: selectedPolicy.name,
      amount: selectedPolicy.amount,
      status :"",
      limit: selectedPolicy.limit,
    };
    console.log(idobj, " in handleclick");
    props.handleAdd(idobj);
  };

  return (
    <>
      <div className="container text-center pt-4  a">
        <div className="container text-center class ">
          <div className="mb-4  row  ">
            <label htmlFor="PolicyName" className="col-sm-3 col-form-label ">
              User Name :
            </label>
            <Select
              options={usersArray}
              getOptionLabel={(usersArray) => usersArray["uname"]}
              onChange={(selectedOption) =>
                handleChange(selectedOption, "user")
              }
              className="select"
            />
          </div>
          <div className="mb-4 row  ">
            <label htmlFor="PolicyName" className="col-sm-3 col-form-label ">
              Policy Name<span className="ms-2">:</span>
            </label>
            <Select
              options={policyArray}
              getOptionLabel={(policy) => policy["name"]}
              onChange={(selectedOption) =>
                handleChange(selectedOption, "policy")
              }
              className="select"
            />
          </div>
          <div className="mb-4 row">
            <label htmlFor="Amount" className="col-sm-3 col-form-label">
              Amount :
            </label>
            <div className="col-sm-5 px-0">
              <input
                type="Number"
                className="form-control select"
                disabled
                defaultValue={selectedPolicy.amount}
              />
            </div>
          </div>
          <div className="mb-4 row">
            <label htmlFor="Maxlimit" className="col-sm-3 col-form-label">
              Max Limit :
            </label>
            <div className="col-sm-5 px-0">
              <input
                type="Number"
                className="form-control select"
                disabled
                defaultValue={selectedPolicy.limit}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark col-4 text-center offset-8 mt-3"
            style={{ position: "relative", right: "12rem" }}
            onClick={() => handleClick()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

//  export class UserPolicyForm extends Component {
//    constructor(){
//      super()
//      this.state = {
//        selectedUser : {},

//        selectedPolicy : {},

//      }

//    }

//    render() {
//
//      const {selectedPolicy} = this.state

//      console.log(selectedPolicy , " in render")

//      return (

//      )
//    }
//  }

//  export default UserPolicyForm
