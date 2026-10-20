class ContactInquiry {
    constructor(name, email, phone, eventType, eventDate, message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.eventType = eventType;
        this.eventDate = eventDate;
        this.message = message;

    }

    // Parameters for a valid email
    isValid() {
    if (
        !this.name?.trim() ||
        !this.email?.trim() ||
        !this.message?.trim()
    ) {
        return false;
    }

    return true;
    }
}

module.exports = ContactInquiry;