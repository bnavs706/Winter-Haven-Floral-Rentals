
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CALENDAR ELEMENTS
    // =========================

    const calendarElement = document.getElementById("calendar");

    const continueButton = document.getElementById("continue-design");

    const selectedDateText = document.getElementById("selected-date-text");

    let selectedDate = null;
    let selectedDayElement = null;


    // =========================
    // DETERMINE BOOKING FLOW
    // =========================

    // Read the flow parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);

    const bookingFlow = urlParams.get("flow");

    console.log("Booking flow:", bookingFlow);


    // =========================
    // GET TODAY'S DATE
    // =========================

    const today = new Date();

    // Remove the time so we only compare dates
    today.setHours(0, 0, 0, 0);


    // =========================
    // CREATE CALENDAR
    // =========================

    const calendar = new FullCalendar.Calendar(calendarElement, {

        initialView: "dayGridMonth",

        // Automatically open the current month
        initialDate: new Date(),

        headerToolbar: false,

        contentHeight: 430,

        aspectRatio: 1.8,


        // =========================
        // STYLE PAST DATES
        // =========================

        dayCellDidMount: function (info) {

            const cellDate = new Date(info.date);

            cellDate.setHours(0, 0, 0, 0);

            // Disable dates before today
            if (cellDate < today) {

                info.el.classList.add("unavailable-date");

            }

        },


        // =========================
        // DATE CLICK
        // =========================

        dateClick: function (info) {

            // Don't allow dates outside the displayed month
            if (info.dayEl.classList.contains("fc-day-other")) {
                return;
            }


            // Don't allow past dates
            if (info.dayEl.classList.contains("unavailable-date")) {
                return;
            }


            // Remove the previous selection
            if (selectedDayElement !== null) {

                selectedDayElement.classList.remove("selected-date");

            }


            // Save the selected date
            selectedDate = info.dateStr;

            selectedDayElement = info.dayEl;


            // Save the date for the Review page
            localStorage.setItem("selectedDate", selectedDate);


            // Highlight the selected date
            selectedDayElement.classList.add("selected-date");


            // Format the selected date
            const date = new Date(info.dateStr + "T00:00:00");

            const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });


            // Display the selected date underneath the calendar
            selectedDateText.textContent = formattedDate + " selected";


            // Enable the Continue button
            continueButton.classList.remove("disabled");


            console.log("Selected date:", selectedDate);

            console.log(
                "Saved date:",
                localStorage.getItem("selectedDate")
            );

        }

    });


    // =========================
    // DISPLAY CALENDAR
    // =========================

    calendar.render();


    // =========================
    // CONTINUE TO DESIGN
    // =========================

    continueButton.addEventListener("click", function (event) {

        // Stop the original link from navigating automatically
        event.preventDefault();


        // Make sure a date was selected
        if (selectedDate === null) {

            alert("Please select an event date first.");

            return;

        }


        // Birthday Party booking flow
        if (bookingFlow === "birthday") {

            window.location.href = "birthday-packages.html";

        }

        // Original Arch Creator booking flow
        else {

            window.location.href = "arch.html";

        }

    });

});
