const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const AuthService = require('./services/auth.service');

const PORT = process.env.PORT || 3000;


const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user'),
        require('./graphql-modules/token'),
        require('./graphql-modules/places_visited'),
        require('./graphql-modules/place_living'),
        require('./graphql-modules/interests'),
        require('./graphql-modules/place_visiting')

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
        console.log(`Playground is up at localhost:${PORT}/graphql`)
    } else if (env.toLowerCase() == 'production') {
        console.log("Running on production environment!")
        console.log("Go to /graphql to see the playground")
    } else if (env.toLowerCase() == 'test') {
        console.log("Running on test environment!")
        console.log(`Playground is up at localhost:${PORT}/graphql`)
    }
}) 