# travel-map-api

## How to get the project running locally
1. Clone the project
2. Run `npm install` to download the projects dependencies
3. Add a `.env` file in the root of the project, and message Matt BeZos in the project unicorn slack to receive the contents for that file (this file is needed to run the project)
4. Run `npm start`
5. Go to the url that is printed in the console to view the graphQL playground

## How to run the project with a connection to your own local database
1. To create your own instance of the database locally, you will have to create a local mysql database.
2. Then locate the config.js file, which is under the config folder in the root of the project... and enter in your local credentials under the `"test"` section.
3. You can then run `sequelize db:migrate --env test` in the command line in the root foler, which will run the migration files and create all the tables in your local database
4. You can then start up the app with a connection to your local database by running `npm test`