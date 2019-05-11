var jwt = require('jsonwebtoken');
const { tokenSecret } = require('../secrets/secret');
const User = require('../models').user;
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server');
const { saltRounds } = require('../secrets/secret');



let returnUserToken = (user) => {
    token = jwt.sign({ user_id: user.id }, tokenSecret);
    return { "token": token }
}

let loginUser = async (username, password) => {
    try {
        let user = await User.findOne({ where: { username } });
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return returnUserToken(user)
        }
        throw new AuthenticationError("Invalid Credentials")
    } catch (err) {
        throw new AuthenticationError("Invalid Credentials")
    }
}

let registerUser = async (userObj) => {
    console.log("FINENENNEE")
    try {
        let plainPassword = userObj.password;
        console.log("Fine 1")
        console.log(saltRounds)
        let hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        userObj.password = hashedPassword;
        let user = await User.create(userObj);
        return returnUserToken(user);
    } catch (err) {
        console.error(err)
        throw ("Error registering new user")
    }

}


module.exports = {
    returnUserToken,
    loginUser,
    registerUser
}