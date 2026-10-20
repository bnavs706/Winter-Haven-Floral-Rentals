
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect information from the contact form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eventType = document.getElementById("event-type").value;
    const eventDate = document.getElementById("event-date").value;
    const message = document.getElementById("message").value;

    // Group the information into one object
    const inquiry = {
        name,
        email,
        phone,
        eventType,
        eventDate,
        message
    };

    // Test that the object contains the information
    fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(inquiry)
    })
    .then(async response => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
    }) 
   .then(data => {
    formStatus.textContent = data.message;
    })
    .catch(error => {
    console.error("Error:", error);
    formStatus.textContent = error.message;
    });
    });
