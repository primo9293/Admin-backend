/* 
    Medicos
    ruta: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')

const router = Router();

// primero ejecuta validarJWT y si es válido pasa a getUsuarios
router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos
    ],
    crearMedico);


router.put('/:id', [],
    actualizarMedico);

router.delete('/:id', borrarMedico);




module.exports = router;