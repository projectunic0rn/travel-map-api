const { ApolloServer } = require('apollo-server');
const { ApolloEngine } = require('apollo-engine');



const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user')
    ]
})




server.listen().then(({url}) => {
    console.log("Server is up at " + url)
})