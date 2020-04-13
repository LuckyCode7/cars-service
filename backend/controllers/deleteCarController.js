const { removeCar } = require('../models/model');

module.exports = {
  deleteCarController: async (req, res) => {
    const id = req.params.id;

    await removeCar(id);

    res.send({});
  }
}
