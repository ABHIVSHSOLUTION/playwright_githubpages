exports.getID = function (users){

let temp = users[users.length -1]
let newId =  Number.parseInt(temp.uid )+ 1
return newId
}
exports.policyID = function (policy){

let temp = policy[policy.length -1]
console.log(temp ,"in genrator")
let newId =  Number.parseInt(temp.pid )+ 1
return newId
}


exports.userPolicy = function (userPolicy) {
    let temp = userPolicy[userPolicy.length - 1]
    let newId = Number.parseInt(temp.id) + 1
    return newId
}