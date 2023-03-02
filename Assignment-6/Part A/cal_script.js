// let n1 = parseInt($("#num1").val());
// let n2 = parseInt($("#num2").val());

$(document).ready(function () {
  $("#username").html(localStorage.getItem("textvalue"));

  var validNumber1 = false;
  var validNumber2 = false;
  var num_regex = /^[0-9]+$/;

  $("#num1").on("input", function () {
    let num1 = $(this).val();
    if (!num_regex.test(num1)) {
      console.log(num1);
      $("#num1Error").html("Please enter a number");
      $("#num1Error").css("color", "red");
      $("#num1Error").show();
      validNumber1 = false;
      return false;
    } else {
      $("#num1Error").hide();
      validNumber1 = true;
    }
  });

  $("#num2").on("input", function () {
    let num2 = $(this).val();
    if (!num_regex.test(num2)) {
      console.log(num2);
      $("#num2Error").html("Please enter a number");
      $("#num2Error").css("color", "red");
      $("#num2Error").show();
      validNumber2 = false;
      return false;
    } else {
      $("#num2Error").hide();
      validNumber2 = true;
    }
  });

  $("#add").click(function () {
    if (validNumber1 && validNumber2) {
      n1 = parseInt($("#num1").val());
      n2 = parseInt($("#num2").val());
      console.log(n1);
      res = (n1, n2) => n1 + n2;
      calForm.result.value = res(n1, n2);
    } else {
      return false;
    }
  });

  $("#sub").click(function () {
    if (validNumber1 && validNumber2) {
      n1 = parseInt($("#num1").val());
      n2 = parseInt($("#num2").val());
      console.log(n1);
      res = (n1, n2) => n1 - n2;
      calForm.result.value = res(n1, n2);
    } else {
      return false;
    }
  });

  $("#mul").click(function () {
    if (validNumber1 && validNumber2) {
      n1 = parseInt($("#num1").val());
      n2 = parseInt($("#num2").val());
      console.log(n1);
      res = (n1, n2) => n1 * n2;
      calForm.result.value = res(n1, n2);
    } else {
      return false;
    }
  });

  $("#div").click(function () {
    if (validNumber1 && validNumber2) {
      n1 = parseInt($("#num1").val());
      n2 = parseInt($("#num2").val());
      console.log(n1);
      res = (n1, n2) => n1 / n2;
      calForm.result.value = res(n1, n2);
    } else {
      return false;
    }
  });
});
