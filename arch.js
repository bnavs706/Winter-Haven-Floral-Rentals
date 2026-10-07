console.log("Arch designer JavaScript is working!");
localStorage.setItem("selectedFloralDesign", "Golden Garden");
localStorage.setItem("selectedDraping", "None");
localStorage.setItem("selectedLighting", "None");

// =========================
// FLORAL DESIGN
// =========================

const floralOptions = document.querySelectorAll(".floral-option");

const archPreviewImage =
    document.getElementById("arch-preview-image");

const selectedDesign =
    document.getElementById("selected-design");


floralOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selected style from all floral options
        floralOptions.forEach(function (button) {
            button.classList.remove("selected");
        });

        // Highlight selected floral design
        option.classList.add("selected");

        // Get image stored in button
        const newImage = option.dataset.image;

        // Change floral arch preview
        archPreviewImage.src = newImage;

        // Get design name
        const designName =
            option.querySelector("span").textContent;
            localStorage.setItem("selectedFloralDesign", designName);
        // Update selected design text
        selectedDesign.textContent =
            "Selected: " + designName;

        console.log("Selected design:", designName);

    });

});


// =========================
// LIGHTING
// =========================

const lightOptions = document.querySelectorAll(".light-option");

const lightPreviewImage =
    document.getElementById("light-preview-image");


lightOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selected style from lighting buttons
        lightOptions.forEach(function (button) {
            button.classList.remove("selected");
        });

        // Highlight selected option
        option.classList.add("selected");

        // Get light image
        const lightImage = option.dataset.image;
        if (lightImage === "") {
        localStorage.setItem("selectedLighting", "None");
        }    else {
         localStorage.setItem("selectedLighting", "Hanging Lights");
        }
        // None selected
        if (lightImage === "") {

            lightPreviewImage.src = "";
            lightPreviewImage.style.display = "none";

            console.log("Lighting: None");

        } else {

            // Show lights
            lightPreviewImage.src = lightImage;
            lightPreviewImage.style.display = "block";

            console.log("Lighting: Hanging Lights");

        }

    });

});


// =========================
// DRAPING
// =========================

const drapeOptions = document.querySelectorAll(".drape-option");

const drapePreviewImage =
    document.getElementById("drape-preview-image");


drapeOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selected style from drape buttons
        drapeOptions.forEach(function (button) {
            button.classList.remove("selected");
        });

        // Highlight selected option
        option.classList.add("selected");

        // Get drape image
        const drapeImage = option.dataset.image;
        if (drapeImage === "") {
        localStorage.setItem("selectedDraping", "None");
        } else {
        localStorage.setItem("selectedDraping", "Drapes");
         }
        // None selected
        if (drapeImage === "") {

            drapePreviewImage.src = "";
            drapePreviewImage.style.display = "none";

            console.log("Draping: None");

        } else {

            // Show drapes
            drapePreviewImage.src = drapeImage;
            drapePreviewImage.style.display = "block";

            console.log("Draping: Drapes");

        }

    });

});