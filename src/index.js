
const express = require('express');

const{ ServerConfig  } = require('./config');

const apiroutes=require('./routes');
const { where } = require('sequelize');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiroutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on Port: ${ServerConfig.PORT}`);
      
});
