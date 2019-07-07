const User = require('../models').User;
const PlaceVisited = require('../models').Place_visited;
const {
    ForbiddenError
} = require('apollo-server');
const AuthService = require('../services/auth.service');


let addPlaceVisited = async (userId, placeVisitedObj) => {
    try {
        let user = await User.findByPk(userId);
        if (AuthService.isNotLoggedIn(user)) {
            throw new ForbiddenError("Not Authorized to add place visited")
        }
        let cities = placeVisitedObj.cities;
        let placesVisited = [];

        // Loop through each city they have provided for the country... create individual records
        for (let city of cities) {
            let placeVisited = user.createPlace_visited({
                country: placeVisitedObj.country,
                city: city
            });
            placesVisited.push(placeVisited);
        }

        return await Promise.all(placesVisited);

        // socket.emit("new-trip", user.username)

    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

let deletePlaceVisited = async (userId, placeVisitedId) => {
    try {
        let user = await User.findByPk(userId);
        let place_visited = await PlaceVisited.findByPk(placeVisitedId);
        if (AuthService.isNotLoggedInOrAuthorized(user, place_visited.UserId)) {
            throw new ForbiddenError("Not Authorized to delete a place visited to someone elses account")
        }
        return await place_visited.destroy();
    } catch (err) {
        console.error(err)
        throw new Error(err)

    }
}

module.exports = {
    addPlaceVisited,
    deletePlaceVisited
}