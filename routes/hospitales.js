/* 
    Hospitales
    ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')

const router = Router();

// primero ejecuta validarJWT y si es válido pasa a getUsuarios
router.get('/', getHospitales);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital);


router.put('/:id', [],
    actualizarHospital);

router.delete('/:id', borrarHospital);

/* 
router.get('/', (req, res) => {
    res.json({
        ok: true,
        usuarios: []
    })
});
*/


module.exports = router;