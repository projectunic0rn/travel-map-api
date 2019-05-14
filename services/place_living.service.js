const User = require('../models').User;
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


module.exports = {
    addPlaceLiving
}