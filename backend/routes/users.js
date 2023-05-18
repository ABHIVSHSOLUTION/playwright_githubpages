const router = require("express").Router();
const {
  getAllUsers,
  deleteByID,
  addUser,
  updateUser,
} = require("../controller/users");

/* GET users listing. */
router
  .get("/", getAllUsers)
  .delete("/:id/delete", deleteByID)
  .post("/add", addUser)
  .put("/update/:id", updateUser);

module.exports = router;
