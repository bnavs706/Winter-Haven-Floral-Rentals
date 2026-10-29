
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
// FORMAT EVENT DATE
// =========================

function formatEventDate(dateString) {

    if (!dateString) {
        return "No date selected";
    }

    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    const eventDate = new Date(year, month - 1, day);

    return eventDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}


// =========================
// DISPLAY EVENT DATE
// =========================

document.getElementById("review-date").textContent =
    formatEventDate(selectedDate);


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
// GET BOOKING FORM ELEMENTS
// =========================

const confirmButton =
    document.getElementById("confirm-design");

const bookingMessage =
    document.getElementById("booking-message");


// =========================
// SUBMIT BOOKING REQUEST
// =========================

confirmButton.addEventListener("click", async function () {

    // Get customer information
    const name =
        document.getElementById("booking-name")
            .value.trim();

    const emailInput =
        document.getElementById("booking-email");

    const email =
        emailInput.value.trim();

    const phone =
        document.getElementById("booking-phone")
            .value.trim();

    const eventType =
        document.getElementById("booking-event-type")
            .value;

    // =========================
    // VALIDATE INFORMATION
    // =========================

    if (!name || !email || !eventType || !selectedDate) {

        bookingMessage.textContent =
            "Please complete all required fields and select an event date.";

        return;
    }

    if (!emailInput.checkValidity()) {

        bookingMessage.textContent =
            "Please enter a valid email address.";

        return;
    }

    // =========================
    // PREPARE BOOKING DATA
    // =========================

    const booking = {
        name: name,
        email: email,
        phone: phone,
        eventType: eventType,
        eventDate: selectedDate,
        packageName: selectedFloralDesign || "Golden Garden",
        draping: selectedDraping || "None",
        lighting: selectedLighting || "None"
    };

    // Prevent double submissions
    confirmButton.disabled = true;
    confirmButton.textContent = "Submitting...";

    bookingMessage.textContent = "";

    try {

        // =========================
        // SEND BOOKING TO BACKEND
        // =========================

        const response = await fetch(
            "http://localhost:3000/api/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            }
        );

        const result = await response.json();

        // =========================
        // HANDLE SERVER ERRORS
        // =========================

        if (!response.ok) {

            bookingMessage.textContent =
                result.message ||
                result.error ||
                "Unable to submit your booking request.";

            return;
        }

        // =========================
        // SAVE SUCCESS INFORMATION
        // =========================

        sessionStorage.setItem(
            "havenBookingSuccess",
            JSON.stringify({
                bookingId: result.bookingId,
                eventDate: selectedDate,
                status: result.status
            })
        );

        // =========================
        // REDIRECT TO SUCCESS PAGE
        // =========================

        window.location.href =
            "booking-success.html";

    } catch (error) {

        console.error(
            "Booking submission failed:",
            error
        );

        bookingMessage.textContent =
            "Unable to connect to the booking server. Please try again.";

    } finally {

        confirmButton.disabled = false;

        confirmButton.textContent =
            "Submit Booking Request";
    }

});
