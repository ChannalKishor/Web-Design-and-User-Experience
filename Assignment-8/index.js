const { validateEmail, checkPassword } = require("./validateEmail&Pwd");

const express = require("express"),  //need express js
      app = express(),
      mongoose = require("mongoose"),   //need for mongo db connection
      bcrypt = require("bcrypt"),       //for encryption
      bodyParser = require("body-parser");  //for parsing json

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/testdatabase", {   //to connect mongo database
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userDataSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("user", userDataSchema);

//Routing requests
// Home Page
app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

// Create new user
app.post("/user/create", async (req, res) => {

  try {

    let user = await User.findOne({ email: req.body.email });
    let passBool, emailBool = false;

    if (user) {
      res.status(400).send({ message: "Email id already exists" });
    } else {

      if (validateEmail(req.body.email)) {
        // console.log("valid address");
        emailBool = true;
      } else {
        emailBool = false;
        res.status(400).send({ message: "Please input valid email address"});
      }

      if (checkPassword(req.body.password)) {
        passBool = true;
        // console.log("Password is correct");
      } else {
        passBool = false;
        res.status(400).send({ message: "Please input valid password"});
      }

      if (passBool && emailBool) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await User.create({
          email: req.body.email,
          password: hashedPassword,
        });
        res.status(201).send(result);
      }   
    }    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error"});
  }

});

// Update user details
app.post("/user/edit", async (req, res) => {

  const user = await User.findOne({email: req.body.email});
  const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      console.log("here___________________");
      if (req.body.new_email == undefined || req.body.new_password == undefined ) {
        res.status(400).send({ message: "Please provide new email && new password" });
      } else if (req.body.new_email != undefined && req.body.new_password !== undefined) {

        if (validateEmail(req.body.new_email) && checkPassword(req.body.new_password)) {
          console.log("here___________________2");

          User.findByIdAndUpdate(user._id, { email: req.body.new_email }, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update email with user id=${user._id}. User not found`
                });
              } else {
                
                User.findByIdAndUpdate(user._id, { password: hashedPassword }, { useFindAndModify: false }).then();
                res.send({ message: "User email address was updated successfully." })
              };
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User's email with id=" + user._id
              });
            });
        } else {
          res.status(400).send({ message: "Please enter valid email and password" });
        }
      } else {
        res.status(400).send({ message: "Please provide the new email and new password" });
      }
    } else {
      res.status(404).send({
        message: `Password incorrect entered, please retry.`
      });
    }
  } else {
    res.status(404).send({
      message: `User was not found! Please check the email address.`
    });
  }
});

// Get all users
app.get("/user/getAll", async (req, res) => {

  User.find({}, function (err, users) {
      users.forEach(user => delete user.password);
      const newResult = users.map(item => {
        return {
          //id: item._id,
          email: item.email,
          password: item.password
        }
      })
      res.send(newResult);
  });
  
});

// Delete user
app.delete("/user/delete", async (req, res) => {

  const user = await User.findOne({email: req.body.email});

  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      User.findByIdAndDelete(user._id)
        .then(item => {
          if (!item) {
            res.status(404).send({
              message: `Cannot delete User with email=${user.email}. User not found`
            });
          } else {
            res.send({
              message: `User with email id ${user.email} was deleted successfully`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with email=" + user.email
          });
        });
    } else {
      res.status(404).send({
        message: `Password incorrect`
      });
    }
  } else {
    res.status(404).send({
      message: `User not found! Please check the email address.`
    });
  }
});

// Server config block
app.listen(8000, () => {
  console.log("Server started at port 8000");
});