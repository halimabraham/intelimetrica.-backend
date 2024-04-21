const express = require('express');
const routes = require('./routes/routes');
const mysql = require('mysql2/promise');
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Importa el paquete cors

const app = express();
const PORT = process.env.APPPORT;

// Parse requests with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Agrega CORS a todas las solicitudes
app.use(cors());

// Usa nuestro archivo de rutas
app.use('/', routes);

// Función para conectarse a la base de datos
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        console.log('Conexión establecida con la base de datos MYSQL');
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Ejecuta la función de conexión a la base de datos
connectToDatabase();

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto: ${PORT}`);
});
