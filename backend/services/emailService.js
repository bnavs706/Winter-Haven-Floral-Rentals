
const { Resend } = require('resend');

const resend = new Resend(process.env.EMAIL_API_KEY);

// Sends contact inquiries to the business owner
const sendInquiryEmail = async (inquiry) => {

    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: [process.env.EMAIL_TO],
        replyTo: inquiry.email,

        subject: "New Haven Floral Rentals Inquiry",

        text: `
New Customer Inquiry

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || "Not provided"}
Event Type: ${inquiry.eventType || "Not provided"}
Event Date: ${inquiry.eventDate || "Not decided"}

Message:
${inquiry.message}
        `
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = { sendInquiryEmail };
