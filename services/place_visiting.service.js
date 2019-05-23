const User = require('../models').User;
const PlaceVisiting = require('../models').Place_visiting
const { ForbiddenError } = require('apollo-server');
const AuthService = require('../services/auth.service');

let addPlaceVisiting = async (userId, placeVisitingObj) => {
    try {
        let user = await User.findByPk(userId);
        if (AuthService.isNotLoggedIn(user)) {
            throw new ForbiddenError("Not Authorized to add a place visiting to someone elses account")
        }
        return await user.createPlace_visiting(placeVisitingObj)
    } catch (err) {
        console.error(err)
        throw new Error(err)

    }
}

let removePlaceVisiting = async (userId, placeVisitingId) => {
    try {
        let user = await User.findByPk(userId);
        console.log(placeVisitingId)
        let placeVisiting = await PlaceVisiting.findByPk(placeVisitingId);
        if (AuthService.isNotLoggedInOrAuthorized(user, placeVisiting.UserId)) {
            throw new ForbiddenError("Not Authorized to remove a place visiting on someone elses account")
        }
        return await placeVisiting.destroy();
    } catch (err) {
        console.error(err)
        throw new Error(err)

    }

}

module.exports = {
    addPlaceVisiting,
    removePlaceVisiting
}