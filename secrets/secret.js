require('dotenv').config();
const secrets = {
    saltRounds: 13,
    tokenSecret: process.env.TOKEN_SECRET
}

module.exports = secrets;