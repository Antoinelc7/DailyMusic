const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VotingSessionSchema = new Schema({
    module_name: {
        type: String,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    musics: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('VotingSession', VotingSessionSchema);