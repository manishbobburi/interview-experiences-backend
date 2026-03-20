const crypto = require("crypto");

async function generateVerificationToken() {
    return await crypto.randomBytes(32).toString('hex');
}

module.exports = generateVerificationToken;