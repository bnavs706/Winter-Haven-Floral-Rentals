
console.log("My Bookings JavaScript is working!");

const API_URL = "http://localhost:3000/api/bookings";

// =========================
// GET PAGE ELEMENTS
// =========================

const emailForm = document.getElementById("email-form");
const verificationForm =
    document.getElementById("verification-form");

const emailInput = document.getElementById("booking-email");
const codeInput = document.getElementById("verification-code");

const message = document.getElementById("verification-message");

const bookingHistory =
    document.getElementById("booking-history");

const bookingList = document.getElementById("booking-list");

let customerEmail = "";
let accessToken = null;

// =========================
// DISPLAY STATUS MESSAGES
// =========================

function showMessage(text) {
    message.textContent = text;
}

// =========================
// REQUEST VERIFICATION CODE
// =========================

emailForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    customerEmail = emailInput.value.trim().toLowerCase();

    const button = emailForm.querySelector("button");

    button.disabled = true;
    button.textContent = "Sending...";

    showMessage("");

    try {
        const response = await fetch(
            `${API_URL}/request-code`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: customerEmail
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to send verification code."
            );
        }

        emailForm.hidden = true;
        verificationForm.hidden = false;

        showMessage(
            "If the address can receive email, a verification code will be sent. Check your inbox."
        );

        codeInput.focus();

    } catch (error) {
        showMessage(error.message);

    } finally {
        button.disabled = false;
        button.textContent = "Send Verification Code";
    }
});

// =========================
// VERIFY CODE
// =========================

verificationForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const code = codeInput.value.trim();

        const button =
            verificationForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Verifying...";

        showMessage("");

        try {
            const response = await fetch(
                `${API_URL}/verify-code`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: customerEmail,
                        code
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Verification failed."
                );
            }

            accessToken = result.token;

            // Clear the one-time code from the form
            codeInput.value = "";

            // Load bookings using the verified session
            await loadBookings();

        } catch (error) {
            showMessage(error.message);

        } finally {
            button.disabled = false;
            button.textContent = "Verify & View Bookings";
        }
    }
);

// =========================
// LOAD CUSTOMER BOOKINGS
// =========================

async function loadBookings() {

    const response = await fetch(
        `${API_URL}/my`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Unable to load bookings."
        );
    }

    verificationForm.hidden = true;
    bookingHistory.hidden = false;

    showMessage("Email verified successfully!");

    displayBookings(result.bookings || []);
}

// =========================
// FORMAT EVENT DATE
// =========================

function formatDate(dateString) {

    if (!dateString) {
        return "Not specified";
    }

    const [year, month, day] =
        dateString.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

// =========================
// DISPLAY BOOKING HISTORY
// =========================

function displayBookings(bookings) {

    bookingList.replaceChildren();

    if (bookings.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent =
            "No bookings were found for this email address.";

        bookingList.appendChild(emptyMessage);
        return;
    }

    bookings.forEach(function (booking) {

        const card = document.createElement("article");
        card.className = "booking-item";

        const heading = document.createElement("h3");
        heading.textContent = `Booking #${booking.id}`;
        card.appendChild(heading);

        const details = [
            ["Event", booking.eventType],
            ["Date", formatDate(booking.eventDate)],
            ["Floral Design", booking.packageName],
            ["Draping", booking.draping],
            ["Lighting", booking.lighting],
            ["Status", booking.status]
        ];

        details.forEach(function ([label, value]) {

            const row = document.createElement("p");

            const strong = document.createElement("strong");
            strong.textContent = `${label}: `;

            row.appendChild(strong);

            row.appendChild(
                document.createTextNode(value || "None")
            );

            card.appendChild(row);
        });

        bookingList.appendChild(card);
    });
    
console.log("My Bookings JavaScript is working!");

const emailForm = document.getElementById("email-form");
const verificationForm = document.getElementById("verification-form");

emailForm.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Send Verification Code clicked!");

    emailForm.hidden = true;
    verificationForm.hidden = false;
});

}
