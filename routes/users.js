const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

router.post("/create", userController.create);

router.get("/sign-out", userController.destroySession);

router.get("/forgetPassword", userController.forgetPasswordPage);
router.post("/forgetPasswordLink", userController.forgetPasswordLink);

router.post("/addEmployee", userController.addEmployeee);

router.post("/makeAdmin", userController.makeAdmin);

module.exports = router;
