const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async(token) => {
    // async function googleVerify() {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID, // Specify the process.env.GOOGLE_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // console.log('payload', payload);
    const { name, email, picture } = payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return { name, email, picture }
}

// verify().catch(console.error);

module.exports = {
    googleVerify
}

/*
    git add.
    git commit -m 'Seccion12 Google-SignIn - token - Verify Token'
    git push
    git tag
    git tag -a v0.12.0 -m 'Fin seccion 12'
    git push --tags
    Edit tags
*/