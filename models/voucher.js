class Voucher {
    constructor(id, merchantName, value, qty, expiry, isAvailable, price) {
        this.id = id;
        this.merchantName = merchantName;
        this.value = value;
        this.qty = qty;
        this.expiry = expiry;
        this.isAvailable = isAvailable;
        this.price = price;
    }
}

module.exports = Voucher;