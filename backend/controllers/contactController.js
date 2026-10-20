
const ContactInquiry = require("../models/ContactInquiry");
const { sendInquiryEmail } = require("../services/emailService");

const submitContact = async (req, res) => {
    const { name, email, phone, eventType, eventDate, message } = req.body;

    const inquiry = new ContactInquiry(
        name,
        email,
        phone,
        eventType,
        eventDate,
        message
    );

    if (!inquiry.isValid()) {
        return res.status(400).json({
            message: "Please fill out all required fields."
        });
    }

    try {
        await sendInquiryEmail(inquiry);

        return res.status(200).json({
            message: "Your inquiry has been sent successfully!"
        });

    } catch (error) {
        console.error("Email delivery error:", error);

        return res.status(500).json({
            message: "Unable to send your inquiry. Please try again."
        });
    }
};

module.exports = { submitContact };
