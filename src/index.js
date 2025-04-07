
const express = require('express');

const{ ServerConfig  } = require('./config');

const apiroutes=require('./routes');
const { where } = require('sequelize');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiroutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on Port: ${ServerConfig.PORT}`);
    
    //bad code alert
    const { Airport, City } = require('./models');
    // const bangaluru = await City.findByPk(12);
    // console.log(bangaluru);
    // const airport =await Airport.create({name:'Kempegowda airport',code :'BLR',});
    // console.log(airport);
    //     const dbpAirport= await bangaluru.createAirport({name:'Huballi Airport',code:'HUBL'});

    //     const airportsInBlr=await bangaluru.getAirports();
    //     console.log(airportsInBlr)
    // 
    // const airportblr=await bangaluru.removeAirport();
    // console.log(airportblr);
await City.destroy({
    where:{
        id:12
    }
})
});
