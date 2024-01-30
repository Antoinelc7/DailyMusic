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

/**
 * @swagger
 * components:
 *   schemas:
 *     VotingSession:
 *       type: object
 *       properties:
 *         module_name:
 *           type: string
 *           description: Le nom du module de la session de vote.
 *           required: true
 *         expiration_date:
 *           type: string
 *           format: date-time
 *           description: La date d'expiration de la session de vote.
 *           required: true
 *         musics:
 *           type: array
 *           description: La liste des votes de musique proposés associées à la session de vote.
 *           required: true
 */

module.exports = mongoose.model('VotingSession', VotingSessionSchema);