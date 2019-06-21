const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const opn = require('opn');

const AuthService = require('./services/auth.service');


const PORT = process.env.PORT || 4000;


const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user'),
        require('./graphql-modules/token'),
        require('./graphql-modules/places_visited'),
        require('./graphql-modules/place_living'),
        require('./graphql-modules/interests'),
        require('./graphql-modules/place_visiting'),
        require('./graphql-modules/friend_requests')

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
app.use(cors())


server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
    var env = process.env.NODE_ENV || 'dev';
    if (env == 'dev') {
        console.log("Running development environment!")
        opn(`http://localhost:${PORT}/graphql`)
        console.log(`Playground is up at localhost:${PORT}/graphql`)
    }
}) 