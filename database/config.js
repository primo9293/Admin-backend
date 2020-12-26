const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        // await mongoose.connect('mongodb://localhost:27017/test', {
        // await mongoose.connect('mongodb+srv://mean_user:admin123@cluster0.7iybh.mongodb.net/hospitaldbAng', {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB arriba');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hoard e inicializar la BD, ver logs')
    }

}

module.exports = {
    dbConnection
}