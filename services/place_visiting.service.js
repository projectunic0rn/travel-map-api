const User = require('../models').User;
const PlaceVisiting = require('../models').Place_visiting
const {
    ForbiddenError
} = require('apollo-server');
const AuthService = require('../services/auth.service');
const socket = require('../socket');


let addPlaceVisiting = async (userId, placeVisitingObj) => {
    try {
        let user = await User.findByPk(userId);
        if (AuthService.isNotLoggedIn(user)) {
            throw new ForbiddenError("Not Authorized to add a place visiting to someone elses account")
        }
        let cities = placeVisitingObj.city;
        let placesVisiting = [];

        // Loop through each city they have provided for the country... create individual records
        for (let city in cities) {
            let placeVisiting = await user.createPlace_visiting({
                country: placeVisitingObj.country,
                city: city
            });
            placesVisiting.push(placeVisiting);
        }

        // socket.emit("new-trip", user.username)
        return placesVisiting;

        // return placeVisiting;
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