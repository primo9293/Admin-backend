const { response } = require('express');
const Hospital = require('../models/hospital')

const getHospitales = async(req, res = response) => {

    // const hospitales = await Hospital.find();
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
        // msg: 'getHospitales'
    })
}


const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    // const hospital = new Hospital(req.body);
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    // console.log(uid);

    try {

        // Guardar Hospital
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
                // msg: 'crearHospital'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el admin Hosp'
        })
    }


}


const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}



const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}