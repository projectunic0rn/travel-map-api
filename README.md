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

TODO - Update the above section based on new code changes for localhost usage.

### Setting up the Local Database

Many of the database setup and teardown commands rely on [sequelize-cli](https://sequelize.org/master/manual/getting-started.html).

You will need to have a local version of Postgres running on your machine and must setup a user using psql:

```
CREATE ROLE traveler LOGIN SUPERUSER PASSWORD 'mapquest';
```

Once you are up and running with sequelize, you'll want to run the following command to setup your local database:

```
npx sequelize-cli db:create
```

You can also run `db:drop` to remove (or drop) the database for the app.

### Running Migrations

[Migrations](https://sequelize.org/master/manual/migrations.html) store changes to the database model and overall schema of the application.

You'll want to start off my running the following command, which will execute any pending migrations:

```
npx sequelize-cli db:migrate
```

You can revert back to initial state by undoing all migrations with `db:migrate:undo:all` command. You can also revert back to a specific migration by passing its name in --to option.

`npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-maps.js`

Migrations should have a timestamp appended to prefix the filename to indicate the ordering of migrations to be performed when re-running in sequential order.

### Seeds

Seeds are programmatically loadable data which maps to specific models, relations, and attributes within the applications business logic.

When setting up your first database, you'll want to run:

```
npx sequelize-cli db:seed:all
```

This will seed your database.

### Accessing The Database Directly

You can access the Postgres database directly to debug raw SQL queries using psql:

```
psql -U traveler -h localhost -p 5432 travelmaps_api_dev
```

_Note: You will be prompted for your password to access the system._

## How can I contribute to the project
1. You can start off by making sure you join the proj-travel-map channel in the project unicorn slack
2. We can then get you caught up and figure out what tasks are needed to be done
3. You can then checkout a branch to complete a task
4. Once the task is complete, push up your changes to that branch and create a pull request for other team memebers to review
5. Once approved your code will be merged... and WALAHH you are contributing

