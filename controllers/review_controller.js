const User = require("../models/user");
const Review = require("../models/review");

module.exports.newReview = async (req, res) => {
  try {
    const recipient = await User.findById(req.params.id);
    console.log(recipient + " recipient ");
    if (!recipient) {
      console.log("Recipient is not valid");
      return res.redirect("/");
    }

    console.log(recipient._id);
    for (let i = 0; i < req.user.userToReview.length; i++) {
      if (req.user.userToReview[i] == recipient._id) {
        console.log("Entered in the loop");
        req.user.userToReview.splice(i, 1);
        req.user.save();
        break;
      }
    }

    for (let i = 0; i < recipient.reviewRecivedFrom.length; i++) {
      if (!req.user) {
        console.log("User is not logged in");
        req.flash("error", "Please log in!");
        return res.redirect("/users/sign-in");
      }

      if (recipient.reviewRecivedFrom[i] == req.user._id) {
        recipient.reviewRecivedFrom.splice(i, 1);
        const newReview = await Review.create({
          reviewer: recipient._id,
          reviewed: req.user._id,
          content: req.query.newReview,
        });
        if (!newReview) {
          console.log("Review is not created");
        }
        return res.redirect("/");
      }
    }

    return res.redirect("/");
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
