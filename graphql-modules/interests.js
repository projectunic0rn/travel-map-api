const { gql } = require('apollo-server');
const User = require('../models').User;

const typeDefs = gql`
   
    extend type Mutation {
        addInterest(InterestId: Int!): UserInterests!
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

        }
    }

}


module.exports = {
    typeDefs,
    resolvers
}