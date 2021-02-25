const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        // Válido el token
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email })
        let usuario;
        // Verificar si el email ya existe
        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '*Google*',
                img: picture,
                google: true
            })
        } else {
            // existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = 'CambiarContraseña';
        }

        // Guardar en la BD
        await usuario.save();

        // Generar Token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google Signin Válido',
            // googleToken
            token,
            name,
            email,
            picture
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid
        // console.log(req);
        // console.log(uid);


    // Generar Token - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    // const usuarioDB = await Usuario.findById({ _id: uid })
    const usuarioDB = await Usuario.findById(uid);

    res.json({
        ok: true,
        uid,
        token,
        usuarioDB
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}