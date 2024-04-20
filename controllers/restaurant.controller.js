const restaurantModel = require('../models/restaurant.model');

// Controlador para crear un restaurante
async function createRestaurant(req, res) {
    const body = req.body;
    const newRestaurant = {
        id : body.id,
        rating : body.rating,
        name : body.name,
        site : body.site,
        email: body.email,
        phone : body.phone,
        street : body.street,
        city : body.city,
        state : body.state, 
        lat : body.lat,
        lng: body.lng
    };
    try {
        await restaurantModel.createRestaurant(newRestaurant);
        res.status(200).send('Succesfully created restaurant');
    } catch (error) {
        console.error('Error al crear restaurante:', error);
        res.status(500).json({ error: 'Error al crear restaurante' });
    }
}

// Controlador para obtener todos los restaurantes
async function getAllRestaurants(req, res) {
    try {
        const restaurants = await restaurantModel.getAllRestaurants();
        res.send(restaurants);
    } catch (error) {
        console.error('Error al obtener todos los restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener todos los restaurantes' });
    }
}

// Controlador para actualizar un restaurante
async function updateRestaurant(req, res) {
    console.log('entra')
    const id = req.params.id;
    console.log(id)
    const body = req.body;
    const updatedRestaurant = {
        rating : body.rating,
        name : body.name,
        site : body.site,
        email: body.email,
        phone : body.phone,
        street : body.street,
        city : body.city,
        state : body.state, 
        lat : body.lat,
        lng: body.lng
    };
    try {
        await restaurantModel.updateRestaurant(id, updatedRestaurant);
        res.status(200).send('Succesfully updated restaurant');
    } catch (error) {
        console.error('Error al actualizar restaurante:', error);
        res.status(500).json({ error: 'Error al actualizar restaurante' });
    }
}

// Función para eliminar un restaurante existente
async function deleteRestaurant(req, res) {
    const id = req.params.id;
    try {
        await restaurantModel.deleteRestaurant(id)
        res.status(200).send('Succesfully eliminated restaurant');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al eliminar restaurante' });
    }
}

// Controlador para obtener un restaurante por su ID
async function getRestaurantById(req, res) {
    const { id } = req.params;
    try {
        const restaurant = await restaurantModel.getRestaurantById(id);
        res.json(restaurant);
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).json({ error: 'Error al obtener el restaurante' });
    }
}

// Otros controladores para crear, actualizar y eliminar restaurantes

module.exports = { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantById };
