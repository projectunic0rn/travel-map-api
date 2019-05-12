var jwt = require('jsonwebtoken');
const { tokenSecret } = require('../secrets/secret');
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server');
const { saltRounds } = require('../secrets/secret');



let generateUserToken = async (user) => {
    try {
        token = await jwt.sign({ user_id: user.id }, tokenSecret);
        return { "token": token }

    } catch (err) {
        throw new Error(err)
    }

}

let loginUser = async (username, password) => {
    try {
        let user = await User.findOne({ where: { username } });
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return generateUserToken(user)
        }
        throw new AuthenticationError("Invalid Credentials")
    } catch (err) {
        throw new AuthenticationError("Invalid Credentials")
    }
}

let registerUser = async (userObj) => {
    try {
        let plainPassword = userObj.password;
        let hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        userObj.password = hashedPassword;
        let user = await User.create(userObj);
        return generateUserToken(user);
    } catch (err) {
        console.error(err)
        throw new Error("Error registering new user")
    }

}


let verifyToken = async (token) => {
    try {
        let decodedData = await jwt.verify(token, tokenSecret);
        if (decodedData) {
            return decodedData
        }
        throw new AuthenticationError("Invalid JWT token passed")
    } catch (err) {
        throw new AuthenticationError("Invalid JWT token passed")
    }

}


module.exports = {
    generateUserToken,
    loginUser,
    registerUser,
    verifyToken
}