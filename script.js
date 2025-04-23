const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const previewContainer = document.getElementById("previewContainer");
const actionButtons = document.getElementById("actionButtons");
const removeImageButton = document.getElementById("removeImageButton");
const changeImageButton = document.getElementById("changeImageButton");
const uploadPrompt = document.getElementById("uploadPrompt");
const maxFileSize = 500 * 1024; // 500KB in bytes

// Highlight the upload area on drag over
uploadArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadArea.classList.add("drag-over");
});

// Remove highlight on drag leave
uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("drag-over");
});

// Handle file drop
uploadArea.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadArea.classList.remove("drag-over");

  const file = event.dataTransfer.files[0];
  handleFile(file);
});

// Handle file selection via click
uploadArea.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  handleFile(file);
});

// Function to handle file validation and preview
function handleFile(file) {
  if (file && file.size > maxFileSize) {
    alert("File too large. Please upload a photo under 500KB.");
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;

      // Store the image temporarily in local storage
      localStorage.setItem("uploadedImage", imageData);

      // Display the preview
      previewImage.src = imageData;
      previewImage.style.display = "block"; // Show the preview image
      actionButtons.style.display = "flex"; // Show the action buttons
      uploadPrompt.style.display = "none"; // Hide the upload prompt
      previewContainer.style.display = "flex"; // Ensure the preview container is visible
    };
    reader.readAsDataURL(file);
  }
}

// Handle Remove Image button
removeImageButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event propagation
  // Remove the image from local storage
  localStorage.removeItem("uploadedImage");

  // Reset the UI
  previewImage.style.display = "none"; // Hide the preview image
  actionButtons.style.display = "none"; // Hide the action buttons
  uploadPrompt.style.display = "block"; // Show the upload prompt
  previewContainer.style.display = "none"; // Hide the preview container
  fileInput.value = ""; // Clear the file input
});

// Handle Change Image button
changeImageButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event propagation
  fileInput.click(); // Trigger the file input to select a new image
});

// Load the image from local storage on page load (if any)
window.addEventListener("load", () => {
  const storedImage = localStorage.getItem("uploadedImage");
  if (storedImage) {
    previewImage.src = storedImage;
    previewImage.style.display = "block";
    actionButtons.style.display = "flex";
    uploadPrompt.style.display = "none";
    previewContainer.style.display = "flex";
  }
});

document
  .querySelector(".upload-area")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the uploaded file
    const maxFileSize = 500 * 1024; // 500KB in bytes

    if (file && file.size > maxFileSize) {
      // Show the error message
      document.getElementById("fileError").style.display = "flex";
    } else {
      // Hide the error message if the file size is valid
      document.getElementById("fileError").style.display = "none";
    }
  });

// Function to generate the ticket
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Check if an image has been uploaded
  const uploadedImage = localStorage.getItem("uploadedImage");
  if (!uploadedImage) {
    alert("Please upload an image before generating your ticket.");
    return; // Stop form submission
  }

  // Get form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const github = document.getElementById("github").value.trim();

  // Validate form fields
  if (!fullName || !email || !github) {
    alert("Please fill out all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Populate ticket details
  document.getElementById("ticketName").textContent = `${fullName}`;
  document.getElementById("ticketGithub").textContent = `${github}`;

  // Display the uploaded image on the ticket
  document.getElementById("ticketImage").src = uploadedImage;

  // Show the ticket section
  document.querySelector(".success").style.display = "block";
  document.querySelector(".first-page").style.display = "none";
});

// Helper function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
