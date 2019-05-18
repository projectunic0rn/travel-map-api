const { ApolloServer } = require('apollo-server')

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
    }
})




server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});