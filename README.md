# travel-map-api

## How to get the project running locally
1. Clone the project
2. Run `npm install` to download the projects dependencies
3. Add a `.env` file in the root of the project, and message Matt BeZos in the project unicorn slack to receive the contents for that file (this file is needed to run the project)
4. Run `npm start`
5. Go to the url that is printed in the console to view the graphQL playground

## How to run the project with a connection to your own local database
1. By running `npm start` you are connected to the dev database by default. If you are wanting to connect to your own local database on your machine.. perform the following steps
2. Create your own local mysql database
3. Locate the `config.js` file located under the config folder at the root of the project
4. Under the `"development"` section, add your own username, password, database and host
5. You can then run `npm start` again, and it should run the app with a connection to your local database
