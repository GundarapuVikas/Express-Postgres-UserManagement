"use strict";

var _require = require("express"),
  Router = _require.Router;
var user_controller = require("./controllers/user.controller");
var router = Router();
router.get("/", user_controller.main);
router.post("/addUser", user_controller.addUser);
router.get("/users", user_controller.getusers);
router.get("/fetch_user/:id", user_controller.fetchUserById);
router.put("/update_user/:id", user_controller.updateUserDetails);
router.get("/delete_user/:id", user_controller.deleteUser);
router.get("/deletedUsers", user_controller.listOfDeletedUsers);
router.get("/AutoSuggestUsers/:substring/:limit", user_controller.suggestUsers);
module.exports = router;