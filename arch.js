console.log("Arch builder JavaScript is working!");

const selectedSection = document.getElementById("selected-section");
const archSections = document.querySelectorAll(".arch-zone");

console.log(archSections);


archSections.forEach(function (section) {
   
    section.addEventListener("click", function() {
      
        console.log(section.dataset.section);

        selectedSection.textContent = section.dataset.section;
    });
});




// The arch is divided into equal sections. This is how we select parts individually.

const addFlowersButton = document.getElementById("add-flowers");




console.log(selectedSection);
console.log(addFlowersButton);
