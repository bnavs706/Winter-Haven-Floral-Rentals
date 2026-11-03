
console.log("Booking success page JavaScript is working!");

const savedBooking = sessionStorage.getItem(
    "havenBookingSuccess"
);

const bookingNumber =
    document.getElementById("booking-number");

const bookingDate =
    document.getElementById("booking-date");

if (savedBooking) {
    try {
        const booking = JSON.parse(savedBooking);

        bookingNumber.textContent =
            booking.bookingId != null
                ? "#" + booking.bookingId
                : "--";

        if (booking.eventDate) {
            const [year, month, day] =
                booking.eventDate.split("-").map(Number);

            const date = new Date(year, month - 1, day);

            bookingDate.textContent =
                date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });
        }

    } catch (error) {
        console.error("Could not read booking details:", error);
    }
} else {
    // The page was opened directly, not after submitting.
    document.querySelector(".success-card h1").textContent =
        "No Recent Booking Found";

    document.querySelector(".success-intro").textContent =
        "Submit a booking request to see your confirmation here.";
}
