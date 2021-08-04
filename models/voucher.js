class Voucher {
    constructor(id, merchantName, value, qty, expiry, isAvailable, isGenerated, price) {
        this.id = id;
        this.merchantName = merchantName;
        this.value = value;
        this.qty = qty;
        this.expiry = expiry;
        this.isAvailable = isAvailable;
        this.isGenerated = isGenerated;
        this.price = price;
    }
}

module.exports = Voucher;