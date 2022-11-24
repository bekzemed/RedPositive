const express = require("express");
const router = express.Router();

// user model
const User = require("../model/user");

// get user
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(404).json({ noUser: "No user found" }));
});

// get user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.json(404).json({ noUser: "No user found" }));
});

// create user
router.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    hobbies: req.body.hobbies,
    email: req.body.email,
    phone: req.body.phone,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(err));
});

// delete user
router.delete("/:id", (req, res) => {
  User.findById(req.params.id).then((user) =>
    user
      .remove()
      .then(() => res.json({ success: true }))
      .catch(() => res.status(404).json({ noUser: "User not found" }))
  );
});

// update user
router.put("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((_) => {
      const newUser = new User({
        _id: req.params.id,
        name: req.body.name,
        hobbies: req.body.hobbies,
        email: req.body.email,
        phone: req.body.phone,
      });

      User.updateOne({ _id: req.params.id }, newUser)
        .then((_) => res.json({ updateSuccess: "update sucess" }))
        .catch((err) => res.status(400).json({ updateError: err }));
    })
    .catch((err) => res.status(404).json({ noUser: "User not found" }));
});

module.exports = router;
