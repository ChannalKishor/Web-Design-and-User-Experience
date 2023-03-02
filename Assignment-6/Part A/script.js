$(document).ready(function () {
  $("#login_form").submit(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    var username = $("#username").val();
    var pass = $("#password").val();
    var validation = false;

    // email validation
    var email_regex = /^[a-zA-Z]+\w+([-+.']\w+)*@(northeastern.edu)/;
    if (email == "") {
      $("#emailError").html("Email cannot be blank");
      $("#emailError").css("color", "red");
      $("#emailError").show();
      validation = false;
      return false;
    }
    if (!email_regex.test(email)) {
      $("#emailError").html("Please enter Your Northeastern Email Address");
      $("#emailError").css("color", "red");
      $("#emailError").show();
      validation = false;
      return false;
    } else {
      $("#emailError").hide();
      validation = true;
    }

    // username validation
    var username_regex = /^[a-zA-Z0-9]{3,10}$/;
    if (username == "") {
      $("#usernameError").html("Username cannot be blank");
      $("#usernameError").css("color", "red");
      $("#usernameError").show();
      validation = false;
      return false;
    } else if (!username_regex.test(username)) {
      $("#usernameError").html(
        "Username length should be 3-10 and should not include any special characters"
      );
      $("#usernameError").css("color", "red");
      $("#usernameError").show();
      validation = false;
      return false;
    } else {
      $("#usernameError").hide();
      validation = true;
    }

    // password validation
    var pass_regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,}$)/;

    if (pass == "") {
      $("#passwordError").html("Password cannot be blank");
      $("#passwordError").css("color", "red");
      $("#passwordError").show();
      validation = false;
      return false;
    } else if (!pass_regex.test(pass)) {
      $("#passwordError").html(
        "Password should contain atleast one special character, a number, a lowercase letter and an uppercase letter!"
      );
      $("#passwordError").css("color", "red");
      $("#passwordError").show();
      validation = false;
      return false;
    } else {
      $("#passwordError").hide();
      validation = true;
    }

    // alert("Form submitted successfully");
    // $(this).unbind("submit").submit();

    var user = $("#username").val();
    localStorage.setItem("textvalue", user);
    // return false;

    if (validation == true) {
      window.location.href = "cal.html";
    }
  });
});
