const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());


var corsOptions = {
    //origin: "http://localhost:4200"
    origin: "*"
  };

app.use(cors(corsOptions));

// 1) mettre le serveur à l'écoute(en marche) sur le port 85
app.listen(
    83,
    ()=>{console.log("Serveur Express a l ecoute sur le port 83");}
);

// 2) connexion de notre serveur à la base mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'monapi';


let db 


MongoClient.connect(url, function(err, client) {
 console.log("Connexion réussi avec Mongo");
 db = client.db(dbName);
});

// 3) Création api (endpoints)

// 3.1)Get All countries
app.get('/countries', (req,res) => {
      db.collection('country').find({}).toArray(function(err, data) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(data)
        }) 
    })

//3.2) Post new Country
app.post('/countries', async (req,res) => {
      try {
          const countryData = req.body
          const country = await db.collection('country').insertOne(countryData)
          res.status(201).json(country)
      } catch (err) {
          console.log(err)
          throw err
      }
    })
