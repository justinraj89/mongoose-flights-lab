const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const destinationSchema = new Schema ({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date,
},{
    timestapms: true
})




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
        required: true,
        min: 10,
        max: 9999
    },
    departs: Date,
    destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);