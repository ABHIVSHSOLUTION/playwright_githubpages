var express = require('express');
var router  =  express.Router();
var policy_controller = require("../controller/policyname")


router.get('/' , policy_controller.getAllPolicies)
router.post('/add' , policy_controller.addpolicy)
router.post('/:id/delete' , policy_controller.deleteByID)
router.put('/update' , policy_controller.updatePolicy)

module.exports =  router