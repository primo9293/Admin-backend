/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios')

const router = Router();

router.get('/', getUsuarios);

router.post('/', crearUsuario);


/* 
router.get('/', (req, res) => {
    res.json({
        ok: true,
        usuarios: []
    })
});
*/


module.exports = router;