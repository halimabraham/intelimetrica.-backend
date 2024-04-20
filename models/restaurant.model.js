const mysql = require('mysql2/promise');
const dbConfig = require('../db.config');

// Función para crear un nuevo restaurante
async function createRestaurant(newRestaurant) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = `
            INSERT INTO restaurantes (id, rating, name, site, email, phone, street, city, state, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            newRestaurant.id,
            newRestaurant.rating,
            newRestaurant.name,
            newRestaurant.site,
            newRestaurant.email,
            newRestaurant.phone,
            newRestaurant.street,
            newRestaurant.city,
            newRestaurant.state,
            newRestaurant.lat,
            newRestaurant.lng
        ];
        const [result] = await connection.query(query, values);
        connection.end();
        return result.insertId; // Devuelve el ID del nuevo restaurante creado
    } catch (error) {
        console.error('Error al crear un nuevo restaurante:', error);
        throw error;
    }
}

// Función para obtener todos los restaurantes
async function getAllRestaurants() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const [rows, fields] = await connection.query('SELECT * FROM restaurantes');
        connection.end(); // Cerrar la conexión después de usarla
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los restaurantes:', error);
        throw error;
    }
}

// Función para actualizar un restaurante existente
async function updateRestaurant(id, updatedRestaurant) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = `
            UPDATE restaurantes
            SET rating = ?, name = ?, site = ?, email = ?, phone = ?, street = ?,
                city = ?, state = ?, lat = ?, lng = ?
            WHERE id = ?
        `;
        const values = [
            updatedRestaurant.rating,
            updatedRestaurant.name,
            updatedRestaurant.site,
            updatedRestaurant.email,
            updatedRestaurant.phone,
            updatedRestaurant.street,
            updatedRestaurant.city,
            updatedRestaurant.state,
            updatedRestaurant.lat,
            updatedRestaurant.lng,
            id
        ];
        const [result] = await connection.query(query, values);
        connection.end();
        return result.affectedRows > 0; // Devuelve true si se actualizó el restaurante
    } catch (error) {
        console.error('Error al actualizar el restaurante:', error);
        throw error;
    }
}

// Función para eliminar un restaurante existente
async function deleteRestaurant(id) {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });
        const query = 'DELETE FROM restaurantes WHERE id = ?';
        const [result] = await connection.query(query, [id]);
        connection.end();
        return result.affectedRows > 0; // Devuelve true si se eliminó el restaurante
    } catch (error) {
        console.error('Error al eliminar el restaurante:', error);
        throw error;
    }
}

// Función para obtener un restaurante por su ID
async function getRestaurantById(id) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.query('SELECT * FROM restaurantes WHERE id = ?', [id]);
        connection.end();
        if (rows.length === 0) {
            return null; // Si no se encuentra el restaurante, devolver null
        }
        return rows[0]; // Devolver el primer restaurante encontrado
    } catch (error) {
        console.error('Error al obtener el restaurante por ID:', error);
        throw error;
    }
}

// Otros métodos para crear, actualizar y eliminar restaurantes según sea necesario

module.exports = { getAllRestaurants, createRestaurant,  updateRestaurant, deleteRestaurant, getRestaurantById };
