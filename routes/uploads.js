/*
    Path
    Ruta: api/uploads/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Middleware
router.use(expressFileUpload());
// Ejecuta validarJWT y si es válido pasa a fileUpload
// tipo = Usuario ó Medico ó Hospital
router.put('/:tipo/:id', validarJWT, fileUpload);



module.exports = router;