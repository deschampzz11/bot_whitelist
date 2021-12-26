const mongoose = require('mongoose');

const point = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('point', point);