const { addCar } = require('../models/model');

module.exports = {
  addCarController: async (req, res) => {
    const car = req.body;

    const addedCar = await addCar(car);

    res.send(addedCar);
  }
}