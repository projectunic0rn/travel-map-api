const User = require('../models').User;


let addPlaceVisited = async (userId, placeVisitedObj) => {
    try {
        let user = await User.findByPk(userId);
        if (!user) {
            throw new AuthenticationError("Not Authorized to perform this action")
        }
        let place_visited = await user.createPlace_visited(placeVisitedObj);
        return place_visited;

    } catch (err) {
        console.log(err)
        throw new Error("Error adding place visited")
    }
}

module.exports = {
    addPlaceVisited
}
