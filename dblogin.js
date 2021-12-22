const mongoose = require('mongoose');

module.exports = async (client) => {
    await mongoose.connect(client.config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}

mongoose.connection.on('connected', () => {
    console.log('==============================')
    console.log(`เชื่อมต่อฐานข้อมูลเรียบร้อยแล้ว`)
    console.log('==============================')
})