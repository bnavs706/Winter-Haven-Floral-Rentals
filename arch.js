console.log("Arch builder JavaScript is working!");

const selectedSection = document.getElementById("selected-section");
const archSections = document.querySelectorAll(".arch-zone");

let currentSection = null;

console.log(archSections);


// Select an arch section

archSections.forEach(function (section) {

    section.addEventListener("click", function() {

        currentSection = section;
        console.log(currentSection);

        selectedSection.textContent = section.dataset.section;

    });

});


// Add flowers button

const addFlowersButton = document.getElementById("add-flowers");

addFlowersButton.addEventListener("click", function () {

    if (currentSection === null) {

        console.log("Please select a section first.");

    } else {

        if (currentSection.dataset.hasFlowers === "true") {

            console.log("This section already has flowers.");

        } else {

            currentSection.dataset.hasFlowers = "true";
            

            const flowerImage = document.createElement("img");

            flowerImage.src = "images/purple-flower.png";
            flowerImage.classList.add("flower-image");

            currentSection.appendChild(flowerImage);

            console.log(flowerImage);
            console.log("Flowers added!");
        }

    }

});


// Remove flowers button

const removeFlowersButton = document.getElementById("remove-flowers");

removeFlowersButton.addEventListener("click", function () {

    if (currentSection === null) {

        console.log("Please select a section first.");

    } else {

        if (currentSection.dataset.hasFlowers === "true") {

            const flowerImage =
                currentSection.querySelector(".flower-image");

            console.log(flowerImage);

            flowerImage.remove();

            currentSection.dataset.hasFlowers = "false";
            
        } else {

            console.log("This section has no flowers.");

        }

    }

});


console.log(selectedSection);
console.log(addFlowersButton);