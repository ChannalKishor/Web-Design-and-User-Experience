// Code starts here:

// 1. Variables
const User = require("./model");
const bodyParser = require("body-parser");
const express = require("express");

//2. Express

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/user/create", async (req, res) => {

//3. POST
app.post("/wd_user/wd_create", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Required Fields: Full Name, Email and Password" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Existing Email: Please try again" });
  }

  if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password)
  ) {
    return res.status(400).json({
      message:
        "Password Constraints: >= 8 characters, >= 1 uppercase, >= 1 lowecase, >= 1 digit",
    });
  }

  const user = new User({ fullName, email, password });
  console.log(user);
  await user.save();

  res.json({ message: "SUCCESS: User created" });
});

//4. PUT
app.put("/wd_user/wd_edit", async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!fullName || !password) {
    return res
      .status(400)
      .json({ message: "REQUIRED: Full Name and Password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "NOT FOUND: User" });
  }

  user.fullName = fullName;
  user.password = password;
  await user.save();

  res.json({ message: "SUCCESS: User updated" });
});

//5. DELETE
app.delete("/wd_user/wd_delete", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "NOT FOUND: User" });
  }

  await user.deleteOne();

  res.json({ message: "SUCCESS: user deleted" });
});

// 6. GET
app.get("/wd_user/wd_get", async (req, res) => {
  const users = await User.find({}, "fullName email password");
  res.json(users);
});

//7. Listen
app.listen(8100, () => {
  console.log("LISTEN: Server is listening on Port 8100");
});
