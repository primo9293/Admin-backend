const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email/Contraseña no válida'
            })
        }

        //Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Verificar Contraseña/Email no son válidas'
            })
        }

        // Generar Token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
            // msg: 'Login Hola'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

module.exports = {
    login
}