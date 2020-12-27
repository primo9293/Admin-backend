const { response } = require('express')

const Usuario = require('../models/usuario')

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email google role');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, nombre, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        await usuario.save();

        // console.log('-', req.body);
        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. por favor revisar logs'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario
}