const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;
const PlaceLiving = require('../models').Place_living;

let loadAllUsers = async (args) => {
    try {
        let users = await User.findAll({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }] });
        return users;
    } catch (err) {
        console.error(err)
        throw new Error("Error loading all users")
    }
}

module.exports = {
    loadAllUsers
}