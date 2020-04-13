const fs = require('fs').promises;
const path = require('path');

module.exports = {
  getAllCars: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data);
  },

  getCar: async (id) => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);

    return jsonData.find(car => {
      if (car.id == id) {
        return car;
      }
    })
  },

  addCar: async (car) => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);

    const newCar = { id: jsonData[jsonData.length - 1].id + 1, ...car }

    jsonData.push(newCar);

    fs.writeFile(path.resolve(__dirname, './database.json'), JSON.stringify(jsonData));

    return newCar;
  },

  editCar: async (id, updatedCar) => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);

    let editedCar = null;

    const updatedCars = jsonData.map(car => {
      if (car.id == id) {
        editedCar = Object.assign(car, updatedCar);

        return editedCar;
      }
      else {
        return car;
      }
    })

    fs.writeFile(path.resolve(__dirname, './database.json'), JSON.stringify(updatedCars));

    return editedCar;
  },

  removeCar: async (id) => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);
    
    const cars = jsonData.filter(car => car.id != id);

    fs.writeFile(path.resolve(__dirname, './database.json'), JSON.stringify(cars));
  },
}