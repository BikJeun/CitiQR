const config = require('./config');
const admin = require('firebase-admin');

const dbAdmin = admin.initializeApp(config.firebaseConfig);

module.exports = dbAdmin;