const User = require("../models/user");
const Review = require("../models/review");

module.exports.home = async function (req, res) {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "Please LogIn !");

      return res.redirect("/users/sign-in");
    }
    let user = await User.findById(req.user.id);
    let review = await Review.find({ reviewer: req.user.id });
    console.log(review);
    let recipent = [];
    for (let i = 0; i < user.userToReview.length; i++) {
      let userName = await User.findById(user.userToReview[i]);
      recipent.push(userName);
    }
    let reviews = [];
    for (let i = 0; i < review.length; i++) {
      let reviewUser = await User.findById(review[i].reviewed);
      console.log(review);
      if (reviewUser != null) {
        let currUser = {
          name: reviewUser.name,
          content: review[i].content,
        };
        reviews.push(currUser);
      }
    }

    return res.render("home", {
      title: "ERS | HOME",
      recipent: recipent,
      reviews: reviews,
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
