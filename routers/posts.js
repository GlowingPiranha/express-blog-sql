// * importo express
const express = require('express');

// * definisco il router
const router = express.Router();

// * importo le funzioni dal controller
const postControllers = require('../controllers/postControllers');

// * index
router.get('/', postControllers.index);

// * show
router.get('/:id', postControllers.show);

// * create
router.post('/', postControllers.create);

// * update
router.put('/:id', postControllers.update);

// * delete
router.delete('/:id', postControllers.destroy);



// * esporto router
module.exports = router;