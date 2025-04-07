# Airplane Service Project 

This is a base Node.js project template, which anyone can use as it has been prepared by keeping some of the most important code principles and project management recommendations. Feel free to change anything as per your requirements.

## Project Structure

### `src` Folder
Inside the `src` folder, all the actual source code related to the project will reside. This will not include any tests. (You might want to create a separate `tests` folder.)

Let's take a look inside the `src` folder:

- **`config`** → This folder contains all configurations related to setting up libraries or modules. For example, setting up `dotenv` to use environment variables in a cleaner fashion is done in `server-config.js`. Another example is configuring a logging library for meaningful logs.

- **`routes`** → This folder registers routes and their corresponding middleware and controllers.

- **`middlewares`** → These intercept incoming requests where we can write validators, authenticators, etc.

- **`controllers`** → These act as the last middleware before calling the business layer to execute business logic. Controllers receive incoming requests and data, pass it to the business layer, and structure the API response before sending it back.

- **`repositories`** → This folder contains all the logic for interacting with the database, including raw queries or ORM queries.

- **`services`** → This contains business logic and interacts with repositories to fetch data from the database.

- **`utils`** → This folder contains helper methods, error classes, and other utilities.

## Setup the Project

1. Download this template from GitHub and open it in your favorite text editor.
2. Navigate to the project folder and execute the following command:
   ```sh
   npm install 
   ```
3. In the root directory, create a `.env` file and add the following environment variables:
   ```env
   PORT=<port number of your choice>
   ```
   Example:
   ```env
   PORT=3000
   ```

4. Inside the `src/config` folder, create a file named `config.json` and add the following code:
   ```json
   {
     "development": {
       "username": "root",
       "password": null, // Db-password
       "database": "database_development",//Db-name
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

5. Navigate inside the `src` folder and execute the following command to initialize Sequelize:
   ```sh
   npx sequelize init
   ```
   This will create `migrations` and `seeders` folders along with a `config.json` inside the `config` folder.

6. If you're setting up your development environment, update `config.json` with your database credentials, including username, password, and dialect (e.g., MySQL, MariaDB, etc.).

7. If you're setting up a test or production environment, ensure that the `host` field is updated with your hosted database URL.

8. To run the server, execute:
   ```sh
   npm run dev
   ```






1. Initialize Sequelize

Run the following command to initialize Sequelize in your project. This will generate the necessary configuration files for database connection and models.
```
npx sequelize init
```
2. Create a Database

This command will create the database specified in your config/config.json file.
```
npx sequelize db:create
```
3. Create a Model and Migration for the airplanes Table

Use this command to generate a Sequelize model named Airplane with the specified attributes (modelNumber as a string and capacity as an integer). The --force flag ensures that any existing model with the same name will be replaced.
```
npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer --force
```
4. Migrate the Changes to the Database

To apply the model and update the database schema, run the migration command. This ensures that the airplanes table is created in the database.
```
npx sequelize db:migrate
```

code to the Fkey relation
```
SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'flights' AND CONSTRAINT_SCHEMA = 'flights'; 
```