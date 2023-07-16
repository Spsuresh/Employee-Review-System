const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin_controller");

router.get(
  "/assignWork",
  passport.checkAuthentication,
  adminController.assignWork
);
router.get(
  "/view-employee",
  passport.checkAuthentication,
  adminController.showEmployeeList
);
router.post(
  "/setReviewes",
  passport.checkAuthentication,
  adminController.setReviewrAndReviewe
);
router.post(
  "/newAdmin",
  passport.checkAuthentication,
  adminController.newAdmin
);
router.get(
  "/deleteEmployee/:id",
  passport.checkAuthentication,
  adminController.deleteEmployee
);
router.get(
  "/add-employee",
  passport.checkAuthentication,
  adminController.addEmployee
);

module.exports = router;
