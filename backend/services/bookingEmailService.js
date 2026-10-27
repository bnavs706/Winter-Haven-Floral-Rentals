
const { Resend } = require('resend');

const resend = new Resend(process.env.EMAIL_API_KEY);

// Sends booking confirmation-of-receipt to customer
const sendBookingEmail = async (booking) => {

    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: [booking.email],

        subject: "Haven Floral Rentals - Booking Request Received",

        text: `
Hello ${booking.name},

Thank you for choosing Haven Floral Rentals!

We have successfully received your booking request.

--------------------------------
BOOKING DETAILS
--------------------------------

Booking Number: ${booking.id}
Event Type: ${booking.eventType}
Event Date: ${booking.eventDate}
Package: ${booking.packageName || "Not selected"}

Booking Status: PENDING

--------------------------------

Your booking request has been saved in our system
and is currently awaiting review by the owner.

Please wait for a response before submitting
another booking request for the same date.

IMPORTANT:
Your event is NOT officially confirmed yet.

Once your request has been reviewed, you will
receive further information regarding availability,
pricing, and the required down payment.

Thank you for choosing Haven Floral Rentals!

Best regards,
Haven Floral Rentals
        `
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = { sendBookingEmail };
