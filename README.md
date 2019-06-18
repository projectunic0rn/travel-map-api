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
5. You will then want to run the command `sequelize db:migrate --env development` in the terminal at the root of the project. This will run the migration files that creates all the tables in your local database
6. You can then run `npm start` again, and it should run the app with a connection to your local database

## How can I contribute to the project
1. You can start off by making sure you join the proj-travel-map channel in the project unicorn slack
2. We can then get you caught up and figure out what tasks are needed to be done
3. You can then checkout a branch to complete a task
4. Once the task is complete, push up your changes to that branch and create a pull request for other team memebers to review
5. Once approved your code will be merged... and WALAHH you are contributing

