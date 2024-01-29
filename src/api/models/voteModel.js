const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    music_id: {
        type: Schema.Types.ObjectId,
        ref: 'Music',
        required: true
    },
    // music_id: {
    //     // pour test sans la table music
    //     type: Number,
    //     default: 0,
    //     required: true
    // },
    session_id: {
        type: Schema.Types.ObjectId,
        ref: 'VotingSession',
        required: true
    },
    score: {
        type: Number,
        default: 0,
        required: true
    },
    vote_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    voters: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Vote', voteSchema);