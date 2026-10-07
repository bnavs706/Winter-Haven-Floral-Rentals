console.log("Review page JavaScript is working!");


// =========================
// GET SAVED SELECTIONS
// =========================

const selectedDate =
    localStorage.getItem("selectedDate");

const selectedFloralDesign =
    localStorage.getItem("selectedFloralDesign");

const selectedDraping =
    localStorage.getItem("selectedDraping");

const selectedLighting =
    localStorage.getItem("selectedLighting");


// =========================
// FORMAT AND DISPLAY DATE
// =========================

if (selectedDate) {

    // Split YYYY-MM-DD into separate pieces
    const dateParts = selectedDate.split("-");

    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]) - 1;
    const day = Number(dateParts[2]);

    // Create the date
    const eventDate = new Date(year, month, day);

    // Format the date nicely
    const formattedDate = eventDate.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

    // Display formatted date
    document.getElementById("review-date").textContent =
        formattedDate;

} else {

    document.getElementById("review-date").textContent =
        "No date selected";
}


// =========================
// DISPLAY DESIGN SELECTIONS
// =========================

document.getElementById("review-floral").textContent =
    selectedFloralDesign || "Golden Garden";

document.getElementById("review-draping").textContent =
    selectedDraping || "None";

document.getElementById("review-lighting").textContent =
    selectedLighting || "None";


// =========================
// CONFIRM DESIGN
// =========================

const confirmButton =
    document.getElementById("confirm-design");

confirmButton.addEventListener("click", function () {

    alert("Your design has been confirmed!");

});