
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

// =========================
// CONNECT TO SQLITE DATABASE
// =========================

const db = new DatabaseSync(
    path.join(__dirname, 'bookings.db')
);

// =========================
// CREATE BOOKINGS TABLE
// =========================

db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        event_type TEXT NOT NULL,
        event_date TEXT NOT NULL,
        package_name TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

// =========================
// PREVENT DUPLICATE BOOKINGS
// =========================

db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking
    ON bookings(LOWER(TRIM(email)), event_date)
    WHERE status IN ('pending', 'confirmed');
`);

// =========================
// ADD CUSTOMIZATION COLUMNS
// =========================

// Get existing column information
const columns = db.prepare(
    "PRAGMA table_info(bookings)"
).all();

// Create a list of column names
const columnNames = columns.map(column => column.name);

// Add draping column if missing
if (!columnNames.includes("draping")) {

    db.exec(`
        ALTER TABLE bookings
        ADD COLUMN draping TEXT;
    `);

    console.log("Added draping column to bookings table.");
}

// Add lighting column if missing
if (!columnNames.includes("lighting")) {

    db.exec(`
        ALTER TABLE bookings
        ADD COLUMN lighting TEXT;
    `);

    console.log("Added lighting column to bookings table.");
}

// =========================
// EXPORT DATABASE CONNECTION
// =========================

module.exports = db;
