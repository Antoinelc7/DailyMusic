const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MusicSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true
    },
    spotifyUrl: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Music', MusicSchema);