This is a base node project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recomendations. Feel free to change anything.

`src` ->i Inside the src folder all the actuat source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a took inside the `src` folder
`config` -> In this folder anything  and everything regarding any configurations of setup of a library or module will be done. For example: setting up `dotenv`.
so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`.

One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

`routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

`middlewares` —> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

`controllers` —> they are kind Of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

`repositories` -> this folder contains all the logic using which we interact the
DB by writing queries, the raw queries or ORM queries wilt go here.

`services` -> contains the buiness logic and interacts with repositories for data
from the database.

`utils`-> contains helper methods, error classes etc.

### Setup the Projects

- Download this template from github and open it in your favourite text editor.
-Go inside the folder path and exceute the following command:
  ````
  npm install 
  ````
- In the root directory create a .env file and add the following env variables
  
    ```
      PORT=<port number of your choice>
    ```
ex:
    ```
      PORT=3000
    ```

inside the `src/config` folder create a file aname as config.jason and write the following code:

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
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
- go inside the `src` folder and execute the following command:
  ```
  npx sequelize init
  ```
-by excecuting above code you will get migrations ande seeders folder along with a congig.json inside the config folder.

- If you; re setting up your development environment,then write the username of your db, password Of your db and in dialect mention whatever db you are using 
for ex: mysql, mariadb etc.

-If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute
```
npm run dev
```





*--------------*
-To perform DB oparation run this code ,
```
npx sequelize init
```
-To create table `airplanes` in the database run this code
```
npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer --force
```
```
npx sequelize db:migrate   
```