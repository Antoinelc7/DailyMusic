const VotingSession = require('../models/votingSessionModel');

exports.createSession = async (req, res) => {
    try {
        let newSession = new VotingSession({
            ...req.body,
            expiration_date: new Date(Date.now() + 7 * 60 * 60 * 1000) //exprimé en millisecondes, 7h après la création
            // expiration_date: new Date(Date.now() + 30 * 1000) // set la date à 30s après sa création pour test
        });

        const savedSession = await newSession.save();

        // Planifier la suppression après la période spécifiée par la date d'expiration
        const now = new Date();
        const delay = savedSession.expiration_date - now;

        setTimeout(async () => {
            try {
                // Supprimer la session après la période spécifiée par la date d'expiration
                await VotingSession.deleteOne({ _id: savedSession._id });
                console.log(`Session n°${savedSession._id} supprimée automatiquement.`);
            } catch (error) {
                console.error(`Erreur lors de la suppression automatique de la session n°${savedSession._id}: ${error.message}`);
            }
        }, delay);

        res.status(201).json({ message: `Session créée: ${savedSession.module_name}` });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Requête invalide" });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        let sessions = await VotingSession.find();
        res.status(200).json(sessions);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Sessions introuvables.."});
    }
};

exports.getSession = async (req, res) => {
    try {
        let session = await VotingSession.findById(req.params.sessionId);
        res.status(200).json(session);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Session introuvable.."});
    }
};

exports.deleteSessions = async (req, res) => {
    try {
        const deletedSession = await VotingSession.findByIdAndDelete(req.params.sessionId);
        if (!deletedSession) {
            res.status(404).json({ message: "Session introuvable.." });
            return;
        }
        res.status(204).json({ message: "Session supprimée avec succès!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};