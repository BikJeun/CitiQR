class User {
    constructor(id, firstName, lastName, email, password, acctCreationDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.acctCreationDate = acctCreationDate;
    }
}

module.exports = User;