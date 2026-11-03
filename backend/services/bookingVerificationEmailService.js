
const { Resend } = require("resend");

// Initialize Resend
const resend = new Resend(process.env.EMAIL_API_KEY);

// =========================
// SEND VERIFICATION CODE
// =========================

async function sendVerificationCode(email, code) {

    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: [email],
        subject: "Haven Floral Rentals - Verification Code",
        text: `
Hello!

You requested access to your Haven Floral Rentals bookings.

Your verification code is:

${code}

This code expires in 10 minutes.

If you did not request this code, you can safely ignore this email.

Haven Floral Rentals
        `.trim()
    });

    if (error) {
        throw new Error(
            `Unable to send verification email: ${error.message}`
        );
    }

    return data;
}

module.exports = {
    sendVerificationCode
};
