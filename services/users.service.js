const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;

let loadAllUsers = async (args) => {
    try {
        let users = await User.findAll({ where: args, include: [{ model: PlaceVisited }] });
        return users;
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    loadAllUsers
}