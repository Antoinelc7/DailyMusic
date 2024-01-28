const Music = require('../models/musicModel');

exports.submitMusic = async (req, res) => {
    const { title, artist, spotifyUrl } = req.body;

    try {
        const music = new Music({ title, artist, spotifyUrl });
        await music.save();
        res.status(201).json(music);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Music submission failed." });
    }
};

exports.getMusics = async (req, res) => {
    try {
        const musics = await Music.find();
        res.status(200).json(musics);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Musics not found." });
    }
};