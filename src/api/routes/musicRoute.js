module.exports = (server) => {
    const musicController = require("../controllers/musicController");
    const auth = require("../middlewares/auth");
    server.post("/music/submit", auth, musicController.submitMusic);
    server.get("/music/getAllMusics", auth, musicController.getAllMusics);
    server.get("/music/get/:id", auth, musicController.getMusic);
}