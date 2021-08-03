class Transaction {
    constructor(id, totalLineItem, totalAmt, transactionDate) {
        this.id = id;
        this.totalLineItem = totalLineItem;
        this.totalAmt = totalAmt;
        this.transactionDate = transactionDate;
    }
}

module.exports = Transaction;