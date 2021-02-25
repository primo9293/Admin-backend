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


const actualizarHospital = async(req, res = response) => {

    const hospitalId = req.params.id
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no existe con ese id'
            });
        }

        // Forma 1 de actualizar
        // hospitalDB.nombre = req.body.nombre;

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true });


        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }


}



const borrarHospital = async(req, res = response) => {

    const hospitalId = req.params.id

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no existe con ese id dele'
            });
        }

        await Hospital.findByIdAndDelete(hospitalId);


        res.json({
            ok: true,
            msg: 'Hospital borrado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }


}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}