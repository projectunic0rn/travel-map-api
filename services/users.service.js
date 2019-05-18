const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;
const PlaceLiving = require('../models').Place_living;
const PlaceVisiting = require('../models').Place_visiting;
const Interest = require('../models').Interest;

let loadAllUsers = async (args) => {
    try {
        let users = await User.findAll({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }, { model: PlaceVisiting }, { model: Interest, as: 'Interests' }] });
        console.log(users)
        return users;
    } catch (err) {
        console.error(err)
        throw new Error("Error loading all users")
    }
}

let searchUser = async (args) => {
    try {
        let user = await User.findOne({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }, { model: PlaceVisiting }, { model: Interest, as: 'Interests' }] });
        return user
    } catch (err) {
        console.error(err)
        throw new Error("Error finding user")
    }
}

module.exports = {
    loadAllUsers,
    searchUser
}