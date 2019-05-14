const User = require('../models').User;
const PlaceLiving = require('../models').Place_living;
const { ForbiddenError } = require('apollo-server')

let addPlaceLiving = async (userId, placeLivingObj) => {
    try {
        let user = await User.findByPk(userId);
        if (!user) {
            throw new ForbiddenError("Not Authorized to add a place visited to someone elses account")
        }
        return await user.createPlace_living(placeLivingObj).then(place_living => place_living);
    } catch (err) {
        console.error(err)
        throw ("Error adding place living. User most likely already has a current living place added")
    }

}

let removePlaceLiving = async (userId, placeLivingId) => {
    try {
        let user = await User.findByPk(userId);
        let placeLiving = await PlaceLiving.findByPk(placeLivingId);
        if (!user || placeLiving.UserId !== user.id) {
            throw new ForbiddenError("Not Authorized to add a place visited to someone elses account")
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