/*
    Path
    Ruta: api/uploads/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Middleware
router.use(expressFileUpload());
// Ejecuta validarJWT y si es válido pasa a fileUpload
// tipo = Usuario ó Medico ó Hospital
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;