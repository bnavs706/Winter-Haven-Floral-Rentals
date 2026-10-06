console.log("Review page JavaScript is working!");


// Get saved selections
const selectedDate =
    localStorage.getItem("selectedDate");

const selectedFloralDesign =
    localStorage.getItem("selectedFloralDesign");

const selectedDraping =
    localStorage.getItem("selectedDraping");

const selectedLighting =
    localStorage.getItem("selectedLighting");


// Display selections
document.getElementById("review-date").textContent =
    selectedDate || "No date selected";

document.getElementById("review-floral").textContent =
    selectedFloralDesign || "Golden Garden";

document.getElementById("review-draping").textContent =
    selectedDraping || "None";

document.getElementById("review-lighting").textContent =
    selectedLighting || "None";


// Prototype confirmation
const confirmButton =
    document.getElementById("confirm-design");

confirmButton.addEventListener("click", function () {

    alert("Your design has been confirmed!");

});