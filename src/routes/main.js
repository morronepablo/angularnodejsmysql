const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// get all data
router.get('/', mainController.userAll);

// get single data
router.get('/:id', mainController.userSingle);

// create data
router.post('/', mainController.userCreate);

// update single data
router.put('/:id', mainController.userUpdate);

// delete single data
router.delete('/:id', mainController.userDelete);


module.exports = router;