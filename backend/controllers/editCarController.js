const { editCar } = require('../models/model');

module.exports = {
  editCarController: async (req, res) => {
    const id = req.params.id;
    const car = req.body;

    const editedCar = await editCar(id, car);
    
    res.send(editedCar);
  }
}