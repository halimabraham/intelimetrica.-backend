const express = require('express');
const routes = require('./routes/routes');
const mysql = require('mysql2/promise');
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.APPPORT;

// Parsear solicitudes con body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usa las rutas en tu aplicación
app.use('/', routes);

// Conexión a la base de datos
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        console.log('Conexión establecida con la base de datos MySQL');
        return connection;
    } catch (error) {
        console.error('Error al conectar con la base de datos MySQL:', error);
        throw error;
    }
}

// Ejecuta la función para conectar a la base de datos
connectToDatabase();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});