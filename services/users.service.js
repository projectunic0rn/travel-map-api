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
        throw new Error(err)
    }
}

let searchUser = async (args) => {
    try {
        let user = await User.findOne({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }, { model: PlaceVisiting }, { model: Interest, as: 'Interests' }] });
        return user
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

let getLoggedInUser = async (args) => {
    try {
        let user = await User.findOne({ where: args, include: [{ model: PlaceVisited }, { model: PlaceLiving }, { model: PlaceVisiting }, { model: Interest, as: 'Interests' }] });
        if (!user) {
            throw "no user logged in"
        }
        return user
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

let deleteUser = async (args) => {
    try {
        let user = await User.findByPk(args.id);
        if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
            throw new ForbiddenError("Not Authorized to delete user")
        }
        return await user.destroy();
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}
// The following method should be used if userId is passed separate from the graphql mutation
// let deleteUser = async(userId) => {
//     try {
//         let user = await User.findByPk(userId);
//         if (AuthService.isNotLoggedInOrAuthorized(user, user.id)) {
//             throw new ForbiddenError("Not Authorized to delete user")
//         }
//         return await user.destroy();
//     } catch (err) {
//         console.error(err)
//         throw new Error(err)
//     }
// }
// The authentication method can be altered if desired (just reusing what is already established)

module.exports = {
    loadAllUsers,
    searchUser,
    getLoggedInUser,
    deleteUser
}
