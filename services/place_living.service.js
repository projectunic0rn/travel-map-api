const User = require('../models').User;
const PlaceLiving = require('../models').Place_living;
const { ForbiddenError } = require('apollo-server-express');
const AuthService = require('../services/auth.service');

let addPlaceLiving = async (userId, placeLivingObj) => {
    try {
        let user = await User.findByPk(userId);
        if (AuthService.isNotLoggedIn(user)) {
            throw new ForbiddenError("Not Authorized to add a place living to someone elses account")
        }
        return await user.createPlace_living(placeLivingObj).then(place_living => place_living);
    } catch (err) {
        console.error(err)
        throw ("Error adding place living")
    }
}

let removePlaceLiving = async (userId, placeLivingId) => {
    try {
        let user = await User.findByPk(userId);
        let placeLiving = await PlaceLiving.findByPk(placeLivingId);
        if (AuthService.isNotLoggedInOrAuthorized(user, placeLiving.UserId)) {
            throw new ForbiddenError("Not Authorized to remove a place living on someone elses account")
        }
        return await placeLiving.destroy();
    } catch (err) {
        console.error(err)
        throw ("Error removing the current place of living")
    }

}


module.exports = {
    addPlaceLiving,
    removePlaceLiving
}