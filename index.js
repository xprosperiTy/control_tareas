//Declaro constantes que instancian valores de los modulos instalados de node.js
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const express = require('express');

const aplicacion = express();
const puerto =3000;
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
      const [rows, fields] = await con.execute('SELECT * FROM tareas WHERE id=?');
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error' });
    }
});
//endpoint para insertar una tarea
aplicacion.post('/insertar', (req, res) => {
    const { titulo, descripcion,status,fecha_e,comentarios,responsable,tags } = req.body;
  
    const query = `INSERT INTO tabla (titulo, descripcion,status,fecha_e,comentarios,responsable,tags ) VALUES (?,?,?.?,?,?,?)`;
    const valores = [titulo, descripcion,status,fecha_e,comentarios,responsable,tags ];
  
    connection.query(query, valores, (error, results, fields) => {
      if (error) {
        console.error('Error al insertar:', error);
        res.status(500).send('Error al insertar');
      } else {
        res.send('La informacion fue almacenada');
      }
    });
});
  
  aplicacion.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
  });
  