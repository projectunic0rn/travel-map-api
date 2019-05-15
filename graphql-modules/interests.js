const { gql } = require('apollo-server');
const User = require('../models').User;

const typeDefs = gql`
    extend type Query {
        test_interest: String!
    }

    extend type Mutation {
        addInterest(InterestId: Int!): Interest
    }

    type Interest {
        id: Int!
        name: String
    }

`


const resolvers = {
    Query: {
        test_interest: () => "Interest is working"
    },
    Mutation: {
        addInterest: async (_, { InterestId }, context) => {
            try {
                let user = await User.findByPk(context.user_id);
                let interest = await user.addInterest(InterestId)
                console.log(interest)
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