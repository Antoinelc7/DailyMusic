const Vote = require('../models/voteModel');
const VotingSession = require('../models/votingSessionModel');

// Fonction pour créer un vote
exports.createVote = async (req, res) => {
    try {
        const { sessionId } = req.params,
            userId = req.userData.id;

        // Vérifier si l'utilisateur a déjà voté pour cette session
        const existingVote = await Vote.findOne({ user_id: userId, session_id: sessionId });
        if (existingVote) {
            return res.status(400).json({ message: "Vous avez déjà voté pour cette session." });
        }

        // Créer un nouveau vote
        const newVote = new Vote({
            ...req.body,
            user_id: userId,
            session_id: sessionId
        });

        // Enregistrer le vote dans la base de données
        const savedVote = await newVote.save();

        res.status(201).json({ message: `Vote enregistré avec succès dans la session n°${savedVote.session_id}!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour mettre à jour un vote par son ID
exports.updateVote = async (req, res) => {
    try {
        const { sessionId, voteId } = req.params,
            userId = req.userData.id;

        // Vérifier si le vote existe
        const existingVote = await Vote.findOne({ _id: voteId, session_id: sessionId });
        if (!existingVote) {
            return res.status(404).json({ message: "Vote non trouvé." });
        }

        // Mettre à jour le score
        if (req.body.score != null) {
            existingVote.score = req.body.score;
        }

        // Mettre à jour d'autres propriétés si l'utilisateur est le créateur ou un admin
        if (userId == existingVote.user_id || req.userData.role ) {
            // Vérifier si la requête contient des données pour le contenu autre que le score
            if (Object.keys(req.body).some(key => key !== 'score')) {
                // Mettre à jour d'autres propriétés du vote si nécessaire
                existingVote.music_id = req.body.music_id;
            }
        } else {
            // Si l'utilisateur n'est pas le créateur ou un admin et la requête contient d'autres données, retournez une erreur
            if (Object.keys(req.body).some(key => key !== 'score')) {
                return res.status(403).json({ message: "Vous n'avez pas la permission de modifier ce vote." });
            }
        }

        // Enregistrer la mise à jour dans la base de données
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
        const { sessionId, voteId } = req.params,
            userId = req.userData.id;

        // Vérifier si le vote existe
        const existingVote = await Vote.findOne({ _id: voteId, user_id: userId, session_id: sessionId });
        if (!existingVote) {
            return res.status(404).json({ message: "Vote non trouvé." });
        }

        // Supprimer le vote de la base de données
        await existingVote.remove();

        res.status(204).json({ message: "Vote supprimé avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Fonction pour retrouver tous les votes
exports.getAllVotes = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Obtenir tous les votes pour la session spécifiée
        const votes = await Vote.find({ session_id: sessionId });

        res.status(200).json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};


// Fonction pour retrouver un vote par son ID
exports.getVoteById = async (req, res) => {
    try {
        const { sessionId, voteId } = req.params;

        // Obtenir un vote par son ID et pour la session spécifiée
        const vote = await Vote.findOne({ _id: voteId, session_id: sessionId });
        if (!vote) {
            return res.status(404).json({ message: "Vote non trouvé." });
        }

        res.status(200).json(vote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

