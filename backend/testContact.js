const ContactInquiry = require("./models/ContactInquiry");

const inquiry = new ContactInquiry(
    "Sarah",
    "sarah@gmail.com",
    "555-1234",
    "Wedding",
    "2026-12-15",
    "I would like to rent an arch!"
);

console.log(inquiry.isValid());