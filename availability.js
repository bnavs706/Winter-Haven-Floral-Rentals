document.addEventListener("DOMContentLoaded", function () {

    const calendarElement = document.getElementById("calendar");

    let selectedDate = null;
    let selectedDayElement = null;


    // Get today's date
    const today = new Date();

    // Remove the time so we only compare dates
    today.setHours(0, 0, 0, 0);


    const calendar = new FullCalendar.Calendar(calendarElement, {

        initialView: "dayGridMonth",

        // October 2026 for our demo
        initialDate: "2026-10-01",

        headerToolbar: false,

        contentHeight: 430,
        aspectRatio: 1.8,


        // =========================
        // STYLE PAST DATES
        // =========================

        dayCellDidMount: function (info) {

            const cellDate = new Date(info.date);

            cellDate.setHours(0, 0, 0, 0);

            // Anything before today is unavailable
            if (cellDate < today) {

                info.el.classList.add("unavailable-date");

            }

        },


        // =========================
        // DATE CLICK
        // =========================

        dateClick: function (info) {

            // Don't allow dates outside the current month
            if (info.dayEl.classList.contains("fc-day-other")) {
                return;
            }


            // Don't allow past dates
            if (info.dayEl.classList.contains("unavailable-date")) {
                return;
            }


            // Remove previous selection
            if (selectedDayElement !== null) {
                selectedDayElement.classList.remove("selected-date");
            }


            // Save new selection
            selectedDate = info.dateStr;
            selectedDayElement = info.dayEl;


            // Highlight selected date
            selectedDayElement.classList.add("selected-date");


            // Format the date nicely
            const date = new Date(info.dateStr + "T00:00:00");

            const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });


            // Update text underneath calendar
            document.getElementById("selected-date-text").textContent =
                formattedDate + " selected";


            // Activate Continue button
            document
                .getElementById("continue-design")
                .classList.remove("disabled");


            console.log("Selected date:", selectedDate);
        }

    });


    calendar.render();

});