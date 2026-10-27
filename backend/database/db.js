
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const db = new DatabaseSync(
    path.join(__dirname, 'bookings.db')
);

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


db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking
    ON bookings(LOWER(TRIM(email)), event_date)
    WHERE status IN ('pending', 'confirmed');
`);

module.exports = db;


