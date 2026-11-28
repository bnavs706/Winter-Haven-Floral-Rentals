document.addEventListener("DOMContentLoaded", function () {

    const arrangement = document.getElementById("birthday-arrangement");

    const paletteButtons = document.querySelectorAll(".palette-option");

    let selectedPalette = "purple";

    // Switch color palette
    paletteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Get the selected color
            selectedPalette = button.dataset.palette;

            // Update the arrangement image
            arrangement.src =
                "images/birthday-" + selectedPalette + "-arrangement.png";

            // Remove previous button highlight
            paletteButtons.forEach(function (option) {

                option.classList.remove("selected");

            });

            // Highlight the selected button
            button.classList.add("selected");

        });

    });

});