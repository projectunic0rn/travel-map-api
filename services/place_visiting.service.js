const User = require('../models').User;
const PlaceVisiting = require('../models').Place_visiting
const {
    ForbiddenError
} = require('apollo-server');
const AuthService = require('../services/auth.service');
// const socket = require('../socket');


let addPlaceVisiting = async (userId, placeVisitingObj) => {
    try {
        let user = await User.findByPk(userId);
        if (AuthService.isNotLoggedIn(user)) {
            throw new ForbiddenError("Not Authorized to add a place visiting to someone elses account")
        }
        let cities = placeVisitingObj.cities;
        let countryInfo = placeVisitingObj.country;

        let placesVisiting = [];

        // Loop through each city they have provided for the country... create individual records
        if (cities.length >= 1) {
            for (let city of cities) {
                let placeVisiting = user.createPlace_visiting({
                    country: countryInfo.country,
                    countryId: countryInfo.countryId,
                    countryISO: countryInfo.countryISO,
                    city: city.city,
                    cityId: city.cityId,
                    city_latitude: city.city_latitude,
                    city_longitude: city.city_longitude
                });
                placesVisiting.push(placeVisiting);
            }
            console.log(`SAVING PLACE VISITING RECORDS WITH AT LEAST 1 CITY ENTERED FOR USER : ${user.id}`)
            return await Promise.all(placesVisiting);

        } else {
            let placeVisiting = await user.createPlace_visiting({
                country: countryInfo.country,
                countryId: countryInfo.countryId,
                countryISO: countryInfo.countryISO,
                city: "",
                cityId: 0,
                city_latitude: 0,
                city_longitude: 0
            });
            console.log(`SAVE PLACE VISITING RECORD THAT HAS NO CITY ENTERED FOR USER : ${user.id}`)
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
