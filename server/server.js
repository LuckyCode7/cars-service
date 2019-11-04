const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const httpPort = 8081;
const httpServer = http.createServer(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

let getCarsAsync = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, 'fakeDB.json'), (err, data) => {
      if (err) {
        reject(err);
      }
      let cars = JSON.parse(data);
      resolve(cars);
    });
  });
}

let saveCarsAsync = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, 'fakeDB.json'), JSON.stringify(data), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

app.get('/cars', (req, res) => {
  getCarsAsync().then(cars => {
    res.send(cars);
  }).catch(err => console.log(err));
});

app.get('/cars/:id', (req, res) => {
  const id = req.params.id;
  getCarsAsync().then(cars => {
    cars.find(car => {
      if (car.id == id){
        res.send(car);
      }
    });
  }).catch(err => console.log(err));
});

app.post('/cars', (req, res) => {
  getCarsAsync().then(cars => {
    const car = {
      "id": (parseInt(cars[cars.length - 1].id) + 1).toString(),
      "model": req.body.model,
      "type": req.body.type,
      "year": req.body.year,
      "color": req.body.color,
      "cost": req.body.cost,
      "isFullyDamaged": req.body.isFullyDamaged,
      "clientFirstname": req.body.clientFirstname,
      "clientSurname": req.body.clientSurname,
      "power": req.body.power,
      "plate": req.body.plate,
      "deliveryDate": req.body.deliveryDate,
      "deadline": req.body.deadline
    }
    cars.push(car);
    saveCarsAsync(cars).then(() => {
      res.send(car);
    });
  });
});

app.put('/cars/:id', (req, res) => {
  const id = req.params.id;
  let editedCar = null;
  getCarsAsync().then(cars => {
    cars.forEach((car, index) => {
      if (car.id == id) {
        editedCar = Object.assign(car, req.body);
      }
    });
    saveCarsAsync(cars).then(() => {
      res.send(editedCar);
    });
  });
});

app.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  let newCarsList = null;
  getCarsAsync().then(cars => {
    newCarsList = cars.filter(car => car.id !== id);
    saveCarsAsync(newCarsList).then(() => {
      res.send({});
    });
  });
});

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server is listening on port: ${httpPort}`);
});