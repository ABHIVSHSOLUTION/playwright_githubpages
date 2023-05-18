var users = require("../utils/user");
var helper = require("../helper/idgenerator");



exports.getAllUsers = function (req, res) {
  res.send(users);
};

exports.deleteByID = function (req, res) {
  var { id } = req.params;
  users = users.filter((user) => {
    if (user.uid != id) {
      return true;
    }
    return false;
  });
  res.send(users);
};

exports.addUser = function (req, res) {
  let newId = helper.getID(users);
  var { name, email } = req.body;

  users.push({ uid: newId, id : newId , uname: name, email: email  , });
  res.send(users);
};
exports.updateUser = function (req, res) {
  const { id } = req.params;
  console.log(id ,"id")
  const { name, email } = req.body;
  console.log(name , " backend")
  users.forEach((user) => {
    
    if (user.uid == id) {
      console.log(name, email);
      user.uname = name;
      user.email = email;
    } 
  });
  console.log(users)
  res.send(users);

};
