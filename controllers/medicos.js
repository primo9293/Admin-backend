const { response } = require('express');
const Medico = require('../models/medico')

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
        // msg: 'getMedicos'
    })
}


const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        // hospital: req.hospital, ya dentro del req.body se envia el hospital
        ...req.body
    });

    try {
        // Guardar Medico
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el admin Medi'
        })
    }

}


const actualizarMedico = async(req, res = response) => {

    const medicoId = req.params.id
    const uid = req.uid;

    try {

        const medicoBD = await Medico.findById(medicoId);

        if (!medicoBD) {
            return res.status(404).json({
                ok: true,
                msg: 'Médico no existe con ese id'
            });
        }


        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Médico actualizado',
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin - (medico)'
        })
    }



}



const borrarMedico = async(req, res = response) => {

    const medicoId = req.params.id

    try {

        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no existe con ese id dele'
            });
        }

        await Medico.findByIdAndDelete(medicoId);


        res.json({
            ok: true,
            msg: 'Medico borrado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }



    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}