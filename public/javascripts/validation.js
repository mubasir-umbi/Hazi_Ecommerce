


function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var isValid = true;
  
    // Validate name
    if (name == "") {
      document.getElementById("nameError").innerHTML = "Name is required";
      isValid = false;
    } else {
      document.getElementById("nameError").innerHTML = "";
    }
  
    // Validate email
    if (email == "") {
      document.getElementById("emailError").innerHTML = "Email is required";
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.getElementById("emailError").innerHTML = "Invalid email address";
      isValid = false;
    } else {
      document.getElementById("emailError").innerHTML = "";
    }
  
    // Validate phone
    if (phone == "") {
        document.getElementById("phoneError").innerHTML = "Phone is required";
        isValid = false;
      } else if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").innerHTML = "Invalid phone number";
        isValid = false;
      } else {
        document.getElementById("phoneError").innerHTML = "";
      }

       // Validate password
    if (phone == "") {
        document.getElementById("phoneError").innerHTML = "Phone is required";
        isValid = false;
      } else if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").innerHTML = "Invalid phone number";
        isValid = false;
      } else {
        document.getElementById("phoneError").innerHTML = "";
      }
    
      // Validate confirm password
      if (confirmPassword == "") {
        document.getElementById("confirmPasswordError").innerHTML = "Confirm Password is required";
        isValid = false;
      } else if (confirmPassword != password) {
        document.getElementById("confirmPasswordError").innerHTML = "Passwords do not match";
        isValid = false;
      } else {
        document.getElementById("confirmPasswordError").innerHTML = "";
      }
    
      return isValid;

}




  
  

  

//   <form onsubmit="return validateForm()">
//   <div class="form-group">
//     <label for="name">Name:</label>
//     <input type="text" id="name" name="name" required>
//     <div id="nameError" class="error"></div>
//   </div>
//   <div class="form-group">
//     <label for="email">Email:</label>
//     <input type="email" id="email" name="email" required>
//     <div id="emailError" class="error"></div>
//   </div>
//   <div class="form-group">
//     <label for="phone">Phone:</label>
//     <input type="tel" id="phone" name="phone" required>
//     <div id="phoneError" class="error"></div>
//   </div>
//   <div class="form-group">
//     <label for="password">Password:</label>
//     <input type="password" id="password" name="password" required>
//     <div id="passwordError" class="error"></div>
//   </div>
//   <div class="form-group">
//     <label for="confirmPassword">Confirm Password:</label>
//     <input type="password" id="confirmPassword" name="confirmPassword" required>
//     <div id="confirmPasswordError" class="error"></div>
//   </div>
//   <button type="submit">Submit</button>
// </form>
