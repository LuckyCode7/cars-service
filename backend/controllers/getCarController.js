const { getCar } = require('../models/model');

module.exports = {
  getCarController: async (req, res) => {
    const id = req.params.id;
    const car = await getCar(id);

    res.send(car);
  }
}
