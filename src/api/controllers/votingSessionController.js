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

exports.getSession = async (req, res) => {
    try {
        let session = await VotingSession.findById(req.params.sessionId);
        res.status(200).json(session);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Session introuvable"});
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        let sessions = await VotingSession.find();
        res.status(200).json(sessions);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Sessions introuvables"});
    }
}