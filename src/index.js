
const express = require('express');

const{ ServerConfig  } = require('./config');

const apiroutes=require('./routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiroutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is Up and running on port ${ServerConfig.PORT}`);
 });