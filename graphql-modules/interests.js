const { gql } = require('apollo-server');
const User = require('../models').User;
const Interest = require("../models").Interest;

const typeDefs = gql`
   
    extend type Mutation {
        addInterest(InterestId: Int!): UserInterests!
        addInterestType(name: String!): Interest!
    }

    type Interest {
        id: Int!
        name: String
    }

    type UserInterests {
        UserId: Int!
        InterestId: Int!
    }

`


const resolvers = {
    Mutation: {
        addInterest: async (_, { InterestId }, context) => {
            try {
                let user = await User.findByPk(context.user_id);
                let interest = await user.addInterest(InterestId)
                if (!interest) {
                    throw ("Interest already added")
                }
                return interest

            } catch (err) {
                console.log(err)
                throw (err)
            }
        },
        addInterestType: async (_, { name }) => {
            try {
              let request = await Interest.create({"name": name});
              return request;
            } catch (err) {
              console.log(err);
              throw err;
            }
      }
    }

}


module.exports = {
    typeDefs,
    resolvers
}
