const express = require('express');
const router = express.Router();
const { getAllRestaurants,  createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantById } = require('../controllers/restaurant.controller')

// Ruta de ejemplo
router.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

router.get('/getRestaurants', getAllRestaurants)
router.post('/createRestaurant', createRestaurant)
router.put('/updateRestaurant/:id', updateRestaurant)
router.delete('/deleteRestaurant/:id', deleteRestaurant)

module.exports = router;