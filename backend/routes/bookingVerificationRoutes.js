
const express = require("express");
const crypto = require("node:crypto");

const db = require("../database/db");
const {
    sendVerificationCode
} = require("../services/bookingVerificationEmailService");

const router = express.Router();

// Code expires after 10 minutes
const CODE_EXPIRATION = 10 * 60 * 1000;

// Minimum 60 seconds between requests
const REQUEST_COOLDOWN = 60 * 1000;

// Store verification challenges temporarily
const verificationCodes = new Map();

// Verified sessions expire after 30 minutes
const SESSION_EXPIRATION = 30 * 60 * 1000;

// Store temporary access sessions
const bookingSessions = new Map();


// =========================
// REQUEST VERIFICATION CODE
// =========================

router.post("/request-code", async (req, res) => {

    const email = req.body?.email;

    if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const now = Date.now();

    const existing = verificationCodes.get(cleanEmail);

    // Prevent repeated requests within 60 seconds
    if (
        existing &&
        now - existing.createdAt < REQUEST_COOLDOWN
    ) {
        return res.json({
            message:
                "If the address can receive email, a verification code will be sent."
        });
    }

    // Generate a cryptographically random six-digit code
    const code = crypto.randomInt(0, 1000000)
        .toString()
        .padStart(6, "0");

    // Store only a hash of the code
    const codeHash = crypto.createHash("sha256")
        .update(code)
        .digest("hex");

    verificationCodes.set(cleanEmail, {
        codeHash,
        createdAt: now,
        expiresAt: now + CODE_EXPIRATION,
        attempts: 0
    });

    try {

        await sendVerificationCode(cleanEmail, code);

    } catch (error) {

        verificationCodes.delete(cleanEmail);

        console.error("Verification email error:", error);

        return res.status(503).json({
            message:
                "Verification email is temporarily unavailable. Please try again later."
        });
    }

    return res.json({
        message:
            "If the address can receive email, a verification code will be sent."
    });
});

// =========================
// TEMPORARY TEST ROUTE
// =========================

router.get("/verification-test", (req, res) => {
    res.json({
        message: "Booking verification routes are working!"
    });
});

// =========================
// VERIFY SIX-DIGIT CODE
// =========================

router.post("/verify-code", (req, res) => {

    const { email, code } = req.body || {};

    if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof code !== "string" ||
        !/^\d{6}$/.test(code)
    ) {
        return res.status(400).json({
            message: "Please enter a valid email and six-digit code."
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const challenge = verificationCodes.get(cleanEmail);

    if (!challenge) {
        return res.status(401).json({
            message: "Invalid or expired verification code."
        });
    }

    // Check expiration
    if (Date.now() > challenge.expiresAt) {
        verificationCodes.delete(cleanEmail);

        return res.status(401).json({
            message: "Invalid or expired verification code."
        });
    }

    // Allow a maximum of five attempts
    if (challenge.attempts >= 5) {
        verificationCodes.delete(cleanEmail);

        return res.status(429).json({
            message: "Too many attempts. Request a new code."
        });
    }

    challenge.attempts++;

    const submittedHash = crypto.createHash("sha256")
        .update(code)
        .digest();

    const expectedHash = Buffer.from(
        challenge.codeHash,
        "hex"
    );

    if (!crypto.timingSafeEqual(submittedHash, expectedHash)) {

        if (challenge.attempts >= 5) {
            verificationCodes.delete(cleanEmail);
        }

        return res.status(401).json({
            message: "Invalid or expired verification code."
        });
    }

    // Code is valid: remove it so it cannot be reused
    verificationCodes.delete(cleanEmail);

    // Generate a temporary access token
    const token = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto.createHash("sha256")
        .update(token)
        .digest("hex");

    bookingSessions.set(tokenHash, {
        email: cleanEmail,
        expiresAt: Date.now() + SESSION_EXPIRATION
    });

    return res.json({
        message: "Email verified successfully.",
        token,
        expiresIn: SESSION_EXPIRATION / 1000
    });
});

// =========================
// GET VERIFIED CUSTOMER BOOKINGS
// =========================

router.get("/my", (req, res) => {

    const authorization = req.get("Authorization") || "";

    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Email verification is required."
        });
    }

    const token = authorization.slice(7).trim();

    if (!/^[a-f0-9]{64}$/.test(token)) {
        return res.status(401).json({
            message: "Invalid access session."
        });
    }

    const tokenHash = crypto.createHash("sha256")
        .update(token)
        .digest("hex");

    const session = bookingSessions.get(tokenHash);

    if (!session || Date.now() > session.expiresAt) {
        bookingSessions.delete(tokenHash);

        return res.status(401).json({
            message: "Session expired. Please verify your email again."
        });
    }

    try {
        const bookings = db.prepare(`
            SELECT
                id,
                event_type AS eventType,
                event_date AS eventDate,
                package_name AS packageName,
                draping,
                lighting,
                status,
                created_at AS createdAt
            FROM bookings
            WHERE LOWER(TRIM(email)) = ?
            ORDER BY event_date DESC, id DESC
        `).all(session.email);

        return res.json({ bookings });

    } catch (error) {
        console.error("Unable to retrieve bookings:", error);

        return res.status(500).json({
            message: "Unable to load bookings right now."
        });
    }
});

module.exports = router;
