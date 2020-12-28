/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario);
// router.post('/', crearUsuario);


router.put('/:id', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not(),
        validarCampos,
    ],
    actualizarUsuario);

router.delete('/:id', borrarUsuario);

/* 
router.get('/', (req, res) => {
    res.json({
        ok: true,
        usuarios: []
    })
});
*/


module.exports = router;