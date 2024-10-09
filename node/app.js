import express from "express";
import cors from "cors";
import db from "./database/db.js";

import comidaRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/comida', comidaRoutes);

try {
    db.authenticate();
    console.log('Conexion a la base de datos exitosa');
} catch (error) {
    console.log('Error al conectarse a la base de datos:', error);
}


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8000, () => {
    console.log('Servidor esta Corriendo en http://localhost:8000');
});