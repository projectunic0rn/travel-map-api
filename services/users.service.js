const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;

let loadAllUsers = async (args) => {
    try {
        let users = await User.findAll({ where: args, include: [{ model: PlaceVisited }] });
        return users;
    } catch (err) {
        console.error(err)
        throw new Error("Error loading all users")
    }
}

module.exports = {
    loadAllUsers
}