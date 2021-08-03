class Qr {
    constructor(id, qrStringRepresentation, used, expired, available, date) {
        this.id = id;
        this.qrStringRepresentation = qrStringRepresentation;
        this.used = used;
        this.expired = expired;
        this.available = available;
        this.date = date;
    }
}

module.exports = Qr;