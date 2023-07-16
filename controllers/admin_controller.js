const Users = require("../models/user");

module.exports.assignWork = async function (req, res) {
  let employe = await Users.find({});

  return res.render("admin", {
    title: "ERS | Assign Work",
    employe: employe,
  });
};

module.exports.showEmployeeList = async function (req, res) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You are not Authorized !");
    return res.redirect("/users/sign-in");
  }
  if (req.user.isAdmin == false) {
    req.flash("error", "You are not Authorized");
    return res.redirect("/");
  }
  let employeList = await Users.find({});

  return res.render("employee", {
    title: "ERS | Employe-List",
    employes: employeList,
  });
};

module.exports.setReviewrAndReviewe = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      req.flash("success", "Please Login !");
      console.log("Please logIn");
      return res.redirect("/users/sign-in");
    } else {
      let employee = await Users.findById(req.user.id);

      if (employee.isAdmin == false) {
        req.flash("error", "Opps ! Not Authorized ");
        console.log("User is not admin");
        return res.redirect("/users/sign-in");
      } else if (req.body.sender == req.body.reciver) {
        console.log("sender === reciver");
        req.flash("error", "Sender and reciver should not be same !");
        return res.redirect("back");
      } else {
        let sender = await Users.findById(req.body.sender);
        let reciver = await Users.findById(req.body.reciver);
        console.log(sender + " " + reciver);
        sender.userToReview.push(reciver);
        sender.save();
        reciver.reviewRecivedFrom.push(sender);
        reciver.save();
        req.flash("success", "Task Assigned !");
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Errror in setting up the user " + err);
  }
};
module.exports.newAdmin = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      console.log("Please LogIn");
      req.flash("success", "Please LogIn !");
      return res.redirect("/users/sign-in");
    }
    if (req.user.isAdmin == false) {
      req.flash("error", "You are not Admin !");
      return res.redirect("/");
    }
    if (req.user.isAdmin) {
      let user = await Users.findById(req.body.selectedUser);
      if (!user) {
        return res.redirect("back");
      }
      req.flash("success", "New Admin Added");
      user.isAdmin = "true";
      user.save();
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.deleteEmployee = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "Please Login !");
      return res.redirect("users/sign-in");
    }

    if (!req.user.isAdmin) {
      req.flash("error", "You are not admin !");
      return res.redirect("/");
    }
    let employee = await Users.deleteOne({ _id: req.params.id });
    req.flash("success", "User Deleted!");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.addEmployee = function (req, res) {
  return res.render("addEmployee", {
    title: "ERS | Add Employee",
  });
};
