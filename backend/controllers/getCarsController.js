const { getAllCars } = require('../models/model');

module.exports = {
  getAllCarsController: async (req, res) => {
    const cars = await getAllCars();

    res.send(cars);
  }
}
