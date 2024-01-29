module.exports = (server) => {
    const musicController = require("../controllers/musicController");
    const auth = require("../middlewares/auth");
    server.post("/music/submit", auth, musicController.submitMusic);
    server.get("/music/get", auth, musicController.getMusics);
}