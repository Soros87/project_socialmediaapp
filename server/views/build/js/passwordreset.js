// Function to extract URL parameter value by name
function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Retrieve the userId from the URL parameter "id"
const userId = getUrlParam("id");

// Add an event listener to the form submission
document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Construct the dynamic URL with userId parameter
    const url = `http://localhost:5100/users/reset-password/${userId}`;

    // Perform any additional validation here

    // Post form data to the specified URL
    this.action = url;
    this.method = "POST";
    this.submit();
  });
