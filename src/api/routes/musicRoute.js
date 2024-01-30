/**
 * @openapi
 * components:
 *   schemas:
 *      Music:
 *          type: object
 *          required:
 *              - title
 *              - artist
 *              - spotifyUrl
 *          properties:
 *              title:
 *                  type: string
 *                  description: Le titre de la musique
 *              artist:
 *                  type: string
 *                  description: L'artiste de la musique
 *              spotifyUrl:
 *                  type: string
 *                  unique: true
 *                  description: L'URL Spotify de la musique
 */

module.exports = (server) => {
    const musicController = require("../controllers/musicController");
    const auth = require("../middlewares/auth");

    /**
     * @swagger
     * /music/:
     *   post:
     *     security:
     *       - BearerAuth: []
     *     summary: Soumet une nouvelle musique
     *     tags: [Musiques]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Music'
     *         description: Les détails de la musique
     *     responses:
     *       201:
     *         description: Musique créée avec succès
     *       400:
     *         description: L'envoi de la musique a échoué
     */
    server.post("/music/", auth, musicController.submitMusic);

    /**
     * @swagger
     * /music/:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Récupère toutes les musiques
     *     tags: [Musiques]
     *     responses:
     *       200:
     *         description: Liste de toutes les musiques
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     */
    server.get("/music/", auth, musicController.getAllMusics);

    /**
     * @swagger
     * /music/{musicId}:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Récupère une musique par ID
     *     tags: [Musiques]
     *     parameters:
     *       - in: path
     *         name: musicId
     *         description: ID de la musique à récupérer
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Détails de la musique récupérés avec succès
     *       401:
     *         description: Non autorisé
     *       404:
     *         description: Musique non trouvée
     *       500:
     *         description: Erreur serveur
     */
    server.get("/music/:musicId", auth, musicController.getMusic);
};