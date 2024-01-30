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

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: L'ID de l'utilisateur qui a émis le vote.
 *         music_id:
 *           type: string
 *           description: L'ID de la musique pour laquelle le vote est émis.
 *         session_id:
 *           type: string
 *           description: L'ID de la session de vote à laquelle le vote est associé.
 *         score:
 *           type: number
 *           description: Le score attribué par l'utilisateur.
 *         vote_date:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure auxquelles le vote a été émis.
 *         voters:
 *           type: array
 *           items:
 *             type: string
 *           description: La liste des utilisateurs qui ont émis le vote.
 */

module.exports = mongoose.model('Vote', voteSchema);