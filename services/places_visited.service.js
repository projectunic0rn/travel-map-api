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
        let countryInfo = placeVisitedObj.country;

        let placesVisited = [];

        if (cities) {
            for (let city of cities) {
                let placeVisited = user.createPlace_visited({
                    country: countryInfo.country,
                    countryId: countryInfo.countryId,
                    countryISO: countryInfo.countryISO,
                    city: city.city,
                    cityId: city.cityId,
                    city_latitude: city.city_latitude,
                    city_longitude: city.city_longitude
                });
                placesVisited.push(placeVisited);
            }
            console.log(`SAVING PLACE VISITED RECORDS WITH AT LEAST 1 CITY ENTERED FOR USER : ${user.id}`)
            return await Promise.all(placesVisited);

        } else {
            let placeVisited = await user.createPlace_visited({
                country: countryInfo.country,
                countryId: countryInfo.countryId,
                countryISO: countryInfo.countryISO,
            });
            console.log(`SAVE PLACE VISITING RECORD THAT HAS NO CITY ENTERED FOR USER : ${user.id}`)
            return [placeVisited]

        }
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

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
        if (cities) {
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
            });
            console.log(`SAVE PLACE VISITING RECORD THAT HAS NO CITY ENTERED FOR USER : ${user.id}`)
            return [placeVisiting]

        }


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