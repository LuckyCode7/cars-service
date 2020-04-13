const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const { getAllCarsController } = require('../controllers/getCarsController');
const { getCarController } = require('../controllers/getCarController');
const { addCarController } = require('../controllers/addCarController');
const { editCarController } = require('../controllers/editCarController');
const { deleteCarController } = require('../controllers/deleteCarController');

const router = express.Router();

router.use(cors({
  origin: [
    'https://ravnowak.github.io',
    'http://localhost:4200'
],
  credentials: true
}));

router.use(bodyParser.json());

router.get('/cars', getAllCarsController);
 
router.get('/cars/:id', getCarController);

router.post('/cars', addCarController);

router.put('/cars/:id', editCarController);

router.delete('/cars/:id', deleteCarController);

module.exports = router;