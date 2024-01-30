module.exports = (server) => {
    const musicController = require("../controllers/musicController");
    const auth = require("../middlewares/auth");
    server.post("/music", auth, musicController.submitMusic);
    server.get("/music", auth, musicController.getMusics);
}