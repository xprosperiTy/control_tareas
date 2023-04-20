//Declaro constantes que instancian valores de los modulos instalados de node.js
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const express = require('express');
const aplicacion = express();
const puerto =3000;
//nos permite recibir los datos que se envian por medio de formularios html
aplicacion.use(bodyParser.urlencoded({ extended: true }));

//Creo mi conexion y asigno parametros de conexion a mi bd
const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'control_tareas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
aplicacion.use(bodyParser.json());
// SECCION DE CREACION DE ENDPOINTS 
aplicacion.use(express.static('public'));
//creo un endpoint para inicio de sesion
aplicacion.post('/login', async (req, res) => {
//obtengo los datos del formulario de html
  const { correo, contrasenia } = req.body;
  const [rows] = await con.execute('SELECT * FROM usuarios WHERE correo = ? AND contrasenia= ?', [correo, contrasenia]);
  const usuario = rows[0];
  if (!usuario) {
    res.status(401).json({ message: 'Credenciales inválidas' });
    return;
  }else{
    res.redirect('/menu.html');
  }  
});
//endpoint para consultar todas las tareas
aplicacion.get('/tareas', async (req, res) => {
    try {
      const [rows, fields] = await con.execute('SELECT * FROM tareas');
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error' });
    }
});
//endpoint para consultar una tarea especifica por id
aplicacion.get('/tareas/:id', async (req, res) => {
    try {
      const [rows, fields] = await con.execute('SELECT * FROM tareas WHERE id=?', [req.params.id]);
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error' });
    }
});
//endpoint para insertar una tarea
aplicacion.post('/crear', (req, res) => {
    const { titulo, descripcion,status,fecha_e,comentarios,responsable,tags } = req.body;
    const query = `INSERT INTO tareas (titulo, descripcion,status,fecha_entrega,comentarios,responsable,tags ) VALUES (?,?,?,?,?,?,?)`;
    const valores = [titulo, descripcion,status,fecha_e,comentarios,responsable,tags ];
    con.query(query, valores, (error, results, fields) => {
      
       if(error!=true) {
        res.status(200).json({ message: 'Tarea creada' });
      }
    });
});
aplicacion.put('/editar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {status} = req.body;

    // Actualiza la tarea con el nuevo status
    const [result] = await con.execute('UPDATE tareas SET status = ? WHERE id = ?', [status, id]);

    // Verifica si la tarea fue actualizada exitosamente
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarea actualizada exitosamente' });
    
    } else {
      res.status(404).json({ message: 'No se pudo actualizar la tarea' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});
//elimina la tarea con el id ingresado que obtiene del formulario del archivo editar.html
aplicacion.delete('/eliminar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await con.execute('DELETE FROM tareas WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'No se pudo encontrar la tarea para eliminar' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});
//El servidor esta activado con el puerto 3000
aplicacion.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
  