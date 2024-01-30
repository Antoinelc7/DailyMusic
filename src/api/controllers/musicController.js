const Music = require('../models/musicModel');

exports.submitMusic = async (req, res) => {
    const { title, artist, spotifyUrl } = req.body;

    try {
        const music = new Music({ title, artist, spotifyUrl });
        await music.save();
        res.status(201).json(music);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "L'envoie de la musique a échoué." });
    }
};

exports.getMusic = async (req, res) => {
    const { musicId } = req.params;

    try {
        const music = await Music.findById(musicId);
        if (!music) {
            return res.status(404).json({ message: "Musique introuvable." });
        }
        res.status(200).json(music);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ message: "Erreur du serveur." });
    }
}

exports.getAllMusics = async (req, res) => {
    try {
        const musics = await Music.find();
        res.status(200).json(musics);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Musiques introuvable." });
    }
};