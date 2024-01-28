module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const voteController = require("../controllers/voteController");

        // Créer un vote
    server.post("/votingSession/:sessionId/votes", auth, voteController.createVote)
        // Mettre à jour un vote par son ID
        .put("/votingSession/:sessionId/votes/:voteId", auth, voteController.updateVote)
        // Supprimer un vote par son ID
        .delete("/votingSession/:sessionId/votes/:voteId", auth, voteController.deleteVote)
        // Obtenir tous les votes
        .get("/votingSession/:sessionId/votes", auth, voteController.getAllVotes)
        // Obtenir un vote par son ID
        .get("/votingSession/:sessionId/votes/:voteId", auth, voteController.getVoteById);
};