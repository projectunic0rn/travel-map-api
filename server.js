const { ApolloServer } = require('apollo-server');

const PORT = process.env.PORT || 5000



const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user')
    ]
})




server.listen(PORT).then(({url}) => {
    console.log("Server is up at " + url)
})