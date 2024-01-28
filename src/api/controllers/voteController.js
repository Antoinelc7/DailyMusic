const Vote = require('../models/voteModel');
const VotingSession = require('../models/votingSessionModel');

// Fonction pour créer un vote
exports.createVote = async (req, res) => {
    try {
        const { user_id, music_id, session_id, score } = req.body;

        // Vérifier si l'utilisateur a déjà voté pour cette session
        const existingVote = await Vote.findOne({ user_id, session_id });
        if (existingVote) {
            return res.status(400).json({ message: "Vous avez déjà voté pour cette session." });
        }

        // Créer un nouveau vote
        const newVote = new Vote({
            user_id,
            music_id,
            session_id,
            score,
        });

        // Enregistrer le vote dans la base de données
        const savedVote = await newVote.save();

        res.status(201).json({ message: "Vote enregistré avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour mettre à jour un vote par son ID
exports.updateVote = async (req, res) => {
    try {
        const { score } = req.body;
        const voteId = req.params.voteId;

        // Vérifier si le vote existe
        const existingVote = await Vote.findById(voteId);
        if (!existingVote) {
            return res.status(404).json({ message: "Vote introuvable." });
        }

        // Mettre à jour le score du vote
        existingVote.score = score;

        // Enregistrer les modifications dans la base de données
        await existingVote.save();

        res.status(200).json({ message: "Vote mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour supprimer un vote par son ID
exports.deleteVote = async (req, res) => {
    try {
        const voteId = req.params.voteId;

        // Supprimer le vote par son ID
        const deletedVote = await Vote.findByIdAndDelete(voteId);
        if (!deletedVote) {
            return res.status(404).json({ message: "Vote introuvable." });
        }

        res.status(204).json({ message: "Vote supprimé avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour retrouver tous les votes
exports.getAllVotes = async (req, res) => {
    try {
        let votes = await Vote.find();
        res.status(200).json(votes);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Erreur serveur." });
    }
};

// Fonction pour retrouver un vote par son ID
exports.getVoteById = async (req, res) => {
    try {
        let vote = await Vote.findById(req.params.voteId);
        if (!vote) {
            return res.status(404).json({ message: "Vote introuvable." });
        }
        res.status(200).json(vote);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Erreur serveur." });
    }
};
