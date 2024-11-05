// src/components/AdminView.js
import React from 'react';
import AddAlmuerzo from './AddAlmuerzo.js'; // Ajusta la ruta si es necesario
import DeleteComida from './DeleteComida.js'; // Asegúrate de ajustar la ruta si es necesario
import DeleteEnsalada from './DeleteEnsalada.js';
import DeletePostre from './DeletePostre.js';
import AddEnsalada from './AddEnsalada.js';
import AddPostre from './AddPostre.js'

const AdminView = () => {
    return (
        <div>
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel de administración.</p>
            
            <AddAlmuerzo />
            <AddEnsalada/>
            <AddPostre/>
            <DeleteComida /> 
            <DeleteEnsalada/>
            <DeletePostre/>
        </div>
    );
};

export default AdminView;
