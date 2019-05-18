const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const AuthService = require('./services/auth.service');


const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user'),
        require('./graphql-modules/token'),
        require('./graphql-modules/places_visited'),
        require('./graphql-modules/place_living'),
        require('./graphql-modules/interests'),

    ],
    context: ({ req }) => {
        let token = req.headers.authorization;
        if (token) {
            return AuthService.verifyToken(token)
        }
    },
    introspection: true,
    playground: true

})

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(8080, () => {
    console.log("rady")
}) 