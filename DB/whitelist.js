const mongoose = require('mongoose');

const whitelist = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('whitelist', whitelist);

//! x2Mise#2845 HEHEHEHEE