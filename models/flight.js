const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American','Delta','Southwest','United']
    },
    airport: {
        type: String,
        enum: ['ATL','DFW','DEN','LAX','SAN'],
        default: "DEN"
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: Date
});

module.exports = mongoose.model('Flight', flightSchema);