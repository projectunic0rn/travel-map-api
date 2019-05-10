const { ApolloServer } = require('apollo-server');
const { ApolloEngine } = require('apollo-engine');



const server = new ApolloServer({
    modules: [
        require('./user')
    ]
})




server.listen().then(({url}) => {
    console.log("Server is up at " + url)
})