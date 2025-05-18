const crypto = require('crypto');

const generateShortCode = () => {
    return crypto.randomBytes(3).toString('hex');
};

module.exports = generateShortCode;