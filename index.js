// npm init -y
// https://expressjs.com/es/starter/installing.html
// instalar Express
// npm install express --save
// node index.js
// console.log('Hola Mundo NodeJs')
// https://mongoosejs.com/
// npm i mongoose    define esquemas con datos fuertemente tipados
// Despues

// npm i dotenv  configurar variables globales de entorno 
// Despues de configurar variables globales
// npm i cors

// npm install -g nodemon  Revisa cada vez que se guarda un archivo
// nodemon index.js
// npm run start:dev

// npm i express-validator    Valida los campos si es requerido o no, etc

// npm i bcryptjs   Ayuda a cifrar contraseñas

//  npm i jsonwebtoken   Genera token para la app

// npm i express-fileupload

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del Body
app.use(express.json());

// Bases de Datos
dbConnection();

// Imprimir las variables globales de node y las personalizadas
// console.log(process.env);

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.use('/api/hospitales', require('./routes/hospitales'));

app.use('/api/medicos', require('./routes/medicos'));

app.use('/api/todo', require('./routes/busquedas'));

app.use('/api/upload', require('./routes/uploads'));


// req (request): lo que se solicita. res (response): Lo que repsonde el servidor
/* app.get('/', (req, res) => {
    res.json({
        // res.status(400).json({        
        ok: true,
        msg: 'Hello Mundo'
    })
});
 */
// Levantar el servicio
app.listen(process.env.PORT, () => {
    console.log('Servidor arriba en el puerto ' + process.env.PORT);
});
/* app.listen(3000, () => {
    console.log('Servidor arriba en el puerto ' + 3000);
}); */