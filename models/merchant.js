class Merchant {
    constructor(id, merchantName, email, password, acctCreationDate, role) {
        this.id = id;
        this.merchantName = merchantName;
        this.email = email;
        this.password = password;
        this.acctCreationDate = acctCreationDate;
        this.role = role;
    }
}

module.exports = Merchant;