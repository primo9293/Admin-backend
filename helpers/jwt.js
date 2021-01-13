const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRECT, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log('Error', err);
                reject('No se pudo generar el Token');
            } else {
                // Token generado
                resolve(token);
            }

        });

    });


}

module.exports = {
    generarJWT
}