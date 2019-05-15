const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;
const PlaceLiving = require('../models').Place_living;
const Interest = require('../models').Interest;

let loadAllUsers = async (args) => {
    try {
        let users = await User.findAll({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }, { model: Interest, as: 'Interests' }] });
        console.log(users)
        return users;
    } catch (err) {
        console.error(err)
        throw new Error("Error loading all users")
    }
}

module.exports = {
    loadAllUsers
}