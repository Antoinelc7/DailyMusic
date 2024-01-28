const VotingSession = require('../models/votingSessionModel');

exports.createSession = async (req, res) => {
    try {
        let newSession = new VotingSession({
            ...req.body,
            expiration_date: new Date(Date.now() + 3600000),
        });

        let session = await newSession.save();
        res.status(201).json({message: `Session crée: ${session.module_name}`})
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Requête invalide"});
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