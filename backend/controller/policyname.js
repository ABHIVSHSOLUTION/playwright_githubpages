var policy =  require("../utils/policyname")

var helper = require("../helper/idgenerator")



exports.getAllPolicies = function(req,res){
    res.send(policy);
}

exports.addpolicy =  function(req ,res){
    let newId = helper.policyID(policy);
    console.log(newId)
    var { name, limit  , amount  } = req.body;
  
    policy.push({ id :newId , pid: newId, name: name , amount : amount, limit: limit  });
    res.send(policy);
}

exports.deleteByID = function (req, res) {
    var { id } = req.params;
    policy = policy.filter((el) => {
      if (el.pid != id) {
        return true;
      }
      return false;
    });
    res.send(policy);
  };

  exports.updatePolicy = function (req, res) {
    var {pid , name, limit ,amount } = req.body;
    console.log( pid , name, limit ,amount , " backend")
    policy.forEach((el) => {
      if (el.pid === pid) { 
        el.id = pid
        el.name = name;
        el.limit = limit;
        el.amount = amount;
      } 
    });
    console.log(policy)
    res.send(policy);
  
  };
  

