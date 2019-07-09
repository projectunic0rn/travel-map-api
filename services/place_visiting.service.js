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
        let cities = placeVisitingObj.cities;
        let countryInfo = placeVisitingObj.country;
        console.log(countryInfo)

        let placesVisiting = [];

        // Loop through each city they have provided for the country... create individual records
        if (cities) {
            for (let city of cities) {
                console.log(city.city)
                let placeVisiting = user.createPlace_visiting({
                    country: countryInfo.country,
                    countryId: countryInfo.countryId,
                    countryISO: countryInfo.countryISO,
                    city: city.city,
                    cityId: city.cityId
                });
                placesVisiting.push(placeVisiting);
            }
            return await Promise.all(placesVisiting);

        } else {
            let placeVisiting = await user.createPlace_visiting({
                country: countryInfo.country,
                countryId: countryInfo.countryId,
                countryISO: countryInfo.countryISO,
            });
            return [placeVisiting]

        }
    

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