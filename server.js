const { ApolloServer } = require('apollo-server-express')
const express = require('express');


const AuthService = require('./services/auth.service');

const PORT = process.env.PORT || 5000


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



const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)







// server.listen(PORT).then(({ url }) => {
//     console.log("Server is up at " + url)
// })