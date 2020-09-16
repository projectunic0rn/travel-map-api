const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const scout = require("@scout_apm/scout-apm");
const compression = require("compression");
const cors = require("cors");


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
    require("./graphql-modules/blog_posts"),
  ],
  context: ({ req }) => {
    let token = req.headers.authorization;
    if (token) {
      return AuthService.verifyToken(token);
    }
  },
  introspection: true,
  playground: true,
});

const app = express();
app.use(scout.expressMiddleware()); // Enable the app-wide scout middleware
app.use(cors());
app.use(compression());

server.applyMiddleware({
  app,
  path: "/graphql",
  bodyParserConfig: {
    limit: "100mb",
  },
});

async function start() {
  // Trigger the download and installation of the core-agent
  await scout.install();

  // Start express
  app.start()
}

start();

app.listen(PORT, () => {
  var env = process.env.NODE_ENV || "dev";
  if (env == "dev") {
    console.log("Running development environment!");
    // opn(`http://localhost:${PORT}/graphql`);
    console.log(`Playground is up at localhost:${PORT}/graphql`);
  }
});
