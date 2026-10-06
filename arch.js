console.log("Arch designer JavaScript is working!");


// Get all floral design buttons
const floralOptions = document.querySelectorAll(".floral-option");


// Get the large preview image
const archPreviewImage = document.getElementById("arch-preview-image");


// Get the selected design text
const selectedDesign = document.getElementById("selected-design");


// Listen for clicks on each floral design
floralOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selected style from all floral options
        floralOptions.forEach(function (button) {
            button.classList.remove("selected");
        });


        // Highlight the option that was clicked
        option.classList.add("selected");


        // Get the arch image stored in the button
        const newImage = option.dataset.image;


        // Change the large preview
        archPreviewImage.src = newImage;


        // Get the name of the design
        const designName =
            option.querySelector("span").textContent;


        // Update the selected design text
        selectedDesign.textContent =
            "Selected: " + designName;


        console.log("Selected design:", designName);

    });
    // =========================
// LIGHTING
// =========================

const lightOptions = document.querySelectorAll(".light-option");

const lightPreviewImage =
    document.getElementById("light-preview-image");


lightOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selected style from all lighting buttons
        lightOptions.forEach(function (button) {
            button.classList.remove("selected");
        });


        // Highlight the selected lighting option
        option.classList.add("selected");


        // Get the light image
        const lightImage = option.dataset.image;


        // If "None" was selected
        if (lightImage === "") {

            lightPreviewImage.src = "";
            lightPreviewImage.style.display = "none";

            console.log("Lighting: None");

        } else {

            // Show the lighting layer
            lightPreviewImage.src = lightImage;
            lightPreviewImage.style.display = "block";

            console.log("Lighting: Hanging Lights");

        }

    });

});

});