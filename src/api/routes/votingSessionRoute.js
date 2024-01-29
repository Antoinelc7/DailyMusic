module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const votingSessionController = require("../controllers/votingSessionController");
    server.post("/votingSession", auth, votingSessionController.createSession);
    server.get("/votingSession/", auth, votingSessionController.getAllSessions);
    server.get("/votingSession/:sessionId", auth, votingSessionController.getSession);
}