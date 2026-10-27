
const express = require('express');
const router = express.Router();

const db = require('../database/db');
const { sendBookingEmail } = require('../services/bookingEmailService');

// POST /api/bookings
// Creates a new customer booking request
router.post('/', async (req, res) => {

    const {
        name,
        email,
        phone,
        eventType,
        eventDate,
        packageName
    } = req.body || {};

    // Validate required booking information
    if (
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof eventType !== 'string' || !eventType.trim() ||
        typeof eventDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(eventDate) ||
        !Number.isFinite(Date.parse(eventDate + 'T00:00:00Z')) ||
        new Date(eventDate + 'T00:00:00Z')
            .toISOString().slice(0, 10) !== eventDate
    ) {
        return res.status(400).json({
            message: 'Please provide valid booking information.'
        });
    }

    // Normalize customer information
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanEventType = eventType.trim();

    const cleanPhone =
        typeof phone === 'string' ? phone.trim() : null;

    const cleanPackage =
        typeof packageName === 'string'
            ? packageName.trim()
            : null;

    try {

        // Save booking into SQLite
        const statement = db.prepare(`
            INSERT INTO bookings (
                name,
                email,
                phone,
                event_type,
                event_date,
                package_name
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = statement.run(
            cleanName,
            cleanEmail,
            cleanPhone,
            cleanEventType,
            eventDate,
            cleanPackage
        );

        const bookingId = Number(result.lastInsertRowid);

        // Send booking confirmation email
        let emailSent = false;

        try {
            await sendBookingEmail({
                id: bookingId,
                name: cleanName,
                email: cleanEmail,
                eventType: cleanEventType,
                eventDate: eventDate,
                packageName: cleanPackage
            });

            emailSent = true;

        } catch (emailError) {
            console.error(
                'Booking confirmation email failed:',
                emailError
            );
        }

        // Booking saved successfully
        return res.status(201).json({
            message: 'Booking request saved successfully!',
            bookingId: bookingId,
            status: 'pending',
            emailSent: emailSent
        });

    } catch (error) {

        // Handle duplicate booking requests
        if (
            error.code === 'ERR_SQLITE_ERROR' &&
            /UNIQUE constraint failed/i.test(error.message)
        ) {
            return res.status(409).json({
                message: 'You already have a booking request for this date. Please wait for a response before requesting another booking.'
            });
        }

        // Handle unexpected database errors
        console.error('Booking database error:', error);

        return res.status(500).json({
            message: 'Unable to save booking request. Please try again later.'
        });
    }
});

module.exports = router;
