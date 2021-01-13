const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
    // const { validationResult } = require('express-validator')
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email google role');

    res.json({
        ok: true,
        usuarios,
        // Retorno el uid del usuario que hizo la petición
        // uid: req.uid
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, nombre, password } = req.body;

    /* Se optimiza creando un middlewares
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
         return res.status(400).json({
             ok: false,
             errors: errores.mapped()
         });
     } 
     */

    try {

        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar Usuario
        await usuario.save();

        // Generar Token - JWT: despues de crear el usuario
        const token = await generarJWT(usuario.id);

        // console.log('-', req.body);
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. por favor revisar logs'
        })
    }

}

const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar Token y comprobar si el usuario existe

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el ID'
            })
        }

        // Actualizar
        const { password, google, email, ...campos } = req.body;
        // const campos = req.body;   Optimizado
        // Si busco por el Id y el dato que me envian es igual, elimino el email ya que no es diferente y no lo estan actualizando
        if (usuarioDB.email !== email) {

            const existeEma = await Usuario.findOne({ email });
            // const existeEma = await Usuario.findOne({ email: email });  Optmimizado
            if (existeEma) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;

        /* Optmimizado
        if (usuarioDB.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEma = await Usuario.findOne({ email: req.body.email });
            if (existeEma) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        } */

        // delete campos.password;   se quitan ya que destructure en la linea 84
        // delete campos.google;     se quitan ya que destructure en la linea 84

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);   Optimizado

        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en la aplicación'
        })
    }

}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {


        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en la aplicación al tratar de eliminar'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}