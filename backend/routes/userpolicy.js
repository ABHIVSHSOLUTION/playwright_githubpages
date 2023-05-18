var express = require('express');
var router = express.Router();
var userpolicy_controller =  require("../controller/userpolicy")

/* GET home page. */

router.get('/' , userpolicy_controller.getUserPolicies)
router.post('/add', userpolicy_controller.adduserpolicy)
router.put('/update', userpolicy_controller.UpdatePolicy)
router.put('/update/accept', userpolicy_controller.AcceptClaim)


module.exports = router;