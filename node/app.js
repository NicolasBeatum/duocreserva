import express from "express";
import cors from "cors";
import db from "./database/db.js";
import router from "./routes/routes.js"; // Importa las rutas
import bodyParser from 'body-parser';
import comidasRouter from './routes/routes.js'; // Importa la ruta de comidas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());

// Usa la ruta de comidas
app.use('/api/comidas', comidasRouter);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




app.use(cors());
app.use(express.json());

app.use('/api', router); // Usa las rutas con un prefijo '/api'

try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa');
} catch (error) {
    console.log('Error al conectarse a la base de datos:', error);
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8000, () => {
    console.log('Servidor está corriendo en http://localhost:8000');
});