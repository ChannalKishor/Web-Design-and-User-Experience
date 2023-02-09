// Begin: Define variables
const form = document.querySelector("form");
const titles = document.querySelectorAll('input[name="title"]');
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailId = document.getElementById("emailId");
const phoneNumber = document.getElementById("phoneNumber");
const streetAddress1 = document.getElementById("streetAddress1");
const streetAddress2 = document.getElementById("streetAddress2");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zipcode = document.getElementById("zipcode");
const comments = document.getElementById("comments");
const ratingSelect = document.getElementById("rating");
const dynamicCheckbox = document.getElementById("dynamicCheckbox");
const textReason = document.getElementById("textReason");
const ratingComment = document.getElementById("ratingComment");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

let table = document.getElementById("tableData");
let validatationBool = false;
let validationErrors = {};
// End: Define variables

// Begin: Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title;

  for (let i = 0; i < titles.length; i++) {
    // console.log(titles[i].checked);
    if (titles[i].checked) {
      validatationBool = true;
      title = titles[i].value;
    }
  }

  if (
    // Validate if fields are empty
    validatationBool &&
    firstName.value != "" &&
    lastName.value != "" &&
    emailId.value != "" &&
    validateEmail(emailId.value) &&
    phoneNumber.value != "" &&
    validatePhoneNo(phoneNumber.value) &&
    streetAddress1.value != "" &&
    city.value != "" &&
    state.value != "" &&
    zipcode.value != "" &&
    validateZipCode(zipcode.value) &&
    ratingSelect.value != "select" &&
    ratingComment.value != ""
  ) {
    tableData.innerHTML += `
      <tr>
        <td>${title.charAt(0).toUpperCase() + title.slice(1)}. ${
      firstName.value
    } ${lastName.value}</td>
        <td>${emailId.value}</td>
        <td>${phoneNumber.value}</td>
        <td>${streetAddress1.value}</td>
        <td>${streetAddress2.value}</td>
        <td>${city.value}</td>
        <td>${state.value}</td>
        <td>${zipcode.value}</td>
        <td>${comments.value}</td>
        <td>${ratingSelect.value}</td>
        <td>${ratingComment.value}</td>
      </tr>
    `;

    alert("Details have been uploaded to the table!");
    form.reset();
    validatationBool = false;
  } else {
    alert("Kindly fill the required fields");
  }
});
// End: Submission

// Begin: Validation
phoneNumber.addEventListener("keyup", () => {
  if (validatePhoneNo(phoneNumber.value)) {
    phoneNumber.style.color = "green";
  } else {
    phoneNumber.style.color = "red";
  }
});

// function to validate zip code
zipcode.addEventListener("keyup", () => {
  if (validateZipCode(zipcode.value)) {
    zipcode.style.color = "green";
  } else {
    zipcode.style.color = "red";
  }
});

emailId.addEventListener("keyup", () => {
  const domain = "northeastern.edu";

  if (validateEmail(emailId.value) && emailId.value.indexOf(domain) != -1) {
    emailId.style.color = "green";
  } else if (emailId.value.indexOf(domain) === -1) {
    emailId.style.color = "red";
  }
});

// function to validate phone number
const validatePhoneNo = (no) => {
  const validateMobileRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (no.match(validateMobileRegex)) {
    return true;
  } else {
    return false;
  }
};

// function to validate zip code
const validateZipCode = (zipcode) => {
  const validateZip = /^\d{5}(-\d{4})?$/;

  if (zipcode.match(validateZip)) {
    return true;
  } else {
    return false;
  }
};

const validateEmail = (email) => {
  const validateEmailId = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(validateEmailId)) {
    return true;
  } else {
    return false;
  }
};
// End: Validation

// Begin: Dynamic Selection
ratingSelect.onchange = (e) => {
  if (e.target.value == "5") {
    dynamicCheckbox.style.display = "block";
    textReason.style.display = "none";

    dynamicCheckbox.innerHTML = `
      <p>We are delighted by your ratings. Kindly let us know what you liked the most.  </p>
      <input id="messageCheckbox1" type='checkbox' name="source" value="cuisine" /> Cuisine
      <input id="messageCheckbox2" type='checkbox' name="source" value="food" /> Food
      <input id="messageCheckbox3" type='checkbox' name="source" value="ambience" /> Ambience
      <br><br>
    `;

    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");

    messageCheckbox1.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value.length == 0) {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox2.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
          console.log(validatationBool);
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox3.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });
  } else if (e.target.value == "4") {
    dynamicCheckbox.style.display = "block";
    textReason.style.display = "none";

    dynamicCheckbox.innerHTML = `
      <p>We are happy that you love our offerings. Please let us know how can we get your 5 star rating!</p>
      <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="cuisine" /> Cuisine
      <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="food" /> Food
      <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="ambience" /> Ambience 
      <br><br>
    `;

    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");

    messageCheckbox1.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox2.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox3.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });
  } else if (e.target.value == "3") {
    dynamicCheckbox.style.display = "block";

    dynamicCheckbox.innerHTML = `
      <p>Can you tell us what you loved the most and where we can improve?</p>
      <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="cuisine" /> Cuisine
      <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="food" /> Food
      <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="ambience" /> Ambience 
      <br><br>
    `;

    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");

    messageCheckbox1.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox2.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox3.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });
  } else if (e.target.value == "2") {
    dynamicCheckbox.style.display = "block";
    textReason.style.display = "none";

    dynamicCheckbox.innerHTML = `
      <p>We'll surely work on your opinion, can you tell us what needs our attention?</p>
      <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="cuisine" /> Cuisine
      <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="food" /> Food
      <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="ambiences" /> Ambience 
      <br><br>
    `;

    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");

    messageCheckbox1.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox2.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox3.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });
  } else if (e.target.value == "1") {
    dynamicCheckbox.style.display = "block";
    textReason.style.display = "none";

    dynamicCheckbox.innerHTML = `
      <p>We're sorry that you did not like. Can you please tell us why?</p>
      <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="cuisine" /> Cuisine
      <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="food" /> Food
      <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="ambience" /> Ambience 
      <br><br>
    `;

    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");

    messageCheckbox1.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
        if (ratingComment.value == "") {
          validatationBool = false;
        }
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox2.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });

    messageCheckbox3.addEventListener("click", () => {
      if (
        messageCheckbox1.checked ||
        messageCheckbox2.checked ||
        messageCheckbox3.checked
      ) {
        textReason.style.display = "block";
      } else {
        textReason.style.display = "none";
      }
    });
  } else {
    dynamicCheckbox.style.display = "none";
    textReason.style.display = "none";

    dynamicCheckbox.innerHTML = "";
  }
};
// End: Dynamic Select Block Selection
