const secrets = {
    saltRounds: process.env.SALT_ROUNDS,
    tokenSecret: process.env.TOKEN_SECRET
}

module.exports = secrets;