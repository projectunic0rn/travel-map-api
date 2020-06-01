const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const corsOptions = {
  origin: '*',
  optionsSuccessStatus:200
}
const opn = require("opn");

const AuthService = require("./services/auth.service");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  modules: [
    require("./graphql-modules/user"),
    require("./graphql-modules/token"),
    require("./graphql-modules/places_visited"),
    require("./graphql-modules/place_living"),
    require("./graphql-modules/interests"),
    require("./graphql-modules/social"),
    require("./graphql-modules/place_visiting"),
    require("./graphql-modules/friend_requests"),
    require("./graphql-modules/city_reviews"),
    require("./graphql-modules/blog_posts")
  ],
  context: ({ req }) => {
    let token = req.headers.authorization;
    if (token) {
      return AuthService.verifyToken(token);
    }
  },
  introspection: true,
  playground: true
});

const app = express();
app.use(cors(corsOptions));
app.options('*', cors());
app.use(compression());

console.log(app);

server.applyMiddleware({
  app,
  path: "/graphql",
  bodyParserConfig: {
    limit: "200mb",
    parameterLimit: 50000,
    extended: true
  }
});

app.listen(PORT, () => {
  var env = process.env.NODE_ENV || "dev";
  if (env == "dev") {
    console.log("Running development environment!");
    // opn(`http://localhost:${PORT}/graphql`);
    console.log(`Playground is up at localhost:${PORT}/graphql`);
  }
});
