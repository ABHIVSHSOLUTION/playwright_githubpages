var policy = require("../utils/policyname");
var userpolicy = require("../utils/userpolicy");
var users = require("../utils/user");
var helper = require("../helper/idgenerator");

exports.getUserPolicies = (req, res) => {
  // let newid = helper.policyID(userpolicy);
  let result = [];
  userpolicy.map((el) => {
    let user = users.filter((user) => user.uid === el.uid);
    let policyid = policy.filter((item) => item.pid === el.pid);
    console.log(user, policyid);

    user.map((u) => {
      policyid.map((p) => {
        let obj = {
          id : el.id,
          upid: el.upid,
          uname: u.uname,
          pname: p.name,
          amount: p.amount,
          limit: p.limit,
          camount: el.camount,
          status: el.status,
        };
        result.push(obj);
      });
    });
    return user;
  });
  res.send(result);
};

exports.adduserpolicy = (req, res) => {
  let newid = helper.userPolicy(userpolicy)
  var { uid, pid } = req.body;

  userpolicy.push({id :newid,  upid: newid, uid: uid, pid: pid  ,  status : "" , camount : 0});

  
  let result = [];
  userpolicy.map((el) => {
    let user = users.filter((user) => user.uid === el.uid);
    let policyid = policy.filter((item) => item.pid === el.pid);
    console.log(user, policyid);

    user.map((u) => {
      policyid.map((p) => {
        let obj = {
          id : el.id,
          upid: el.upid,
          uname: u.uname,
          pname: p.name,
          amount: p.amount,
          limit: p.limit,
          camount: 0,
          status: "",
        };
        result.push(obj);
      });
    });
    return user;
  });
  res.send(result);
};

exports.UpdatePolicy = (req, res) => {
;

  let index = userpolicy.findIndex((i) => {
  return i.upid === req.body.upid
  })  
  
  userpolicy[index].camount = req.body.camount;
  userpolicy[index].status = req.body.status;

  let result = userpolicy.map((up) => {
    users.map((u) => {
      if (up.uid === u.uid) {
        Object.assign(up,{uname : u.uname})
      }
    })
    policy.map((p) => {
      if (up.pid === p.pid) {
        Object.assign(up,{pname : p.name , amount :p.amount , limit : p.limit})
      }
    })
    return up
  })

  res.send(result)
};

exports.AcceptClaim = (req, res) => {
  let { upid, status } = req.body;
  console.log(upid, status , " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
  userpolicy.forEach((el) => {
    if (el.upid === upid) {
      el.status = status;
    }
  });
  console.log(userpolicy);
  let result = [];
  userpolicy.map((el) => {
    let user = users.filter((user) => user.uid === el.uid);
    let policyid = policy.filter((item) => item.pid === el.pid);
    user.map((u) => {
      policyid.map((p) => {
        let obj = {
          upid: el.upid,
          uname: u.uname,
          pname: p.name,
          amount: p.amount,
          limit: p.limit,
          camount: Number.parseInt(el.camount),
          status: el.status,
        };
        result.push(obj);
      });
    });
    return user;
  });
  res.send(result);
};
