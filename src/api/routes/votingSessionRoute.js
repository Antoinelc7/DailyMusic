module.exports = (server) => {
    const auth = require("../middlewares/auth");
    const votingSessionController = require("../controllers/votingSessionController");
    server.post("/votingSession/create-session", auth, votingSessionController.createSession);
    server.get("/votingSession/get-session/:sessionId", auth, votingSessionController.getSession);
    //server.get("/votingSession/get-all-sessions", votingSessionController.getAllSessions);
}